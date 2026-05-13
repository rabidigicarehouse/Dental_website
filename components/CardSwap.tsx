'use client';

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';

/* ─── Card ─────────────────────────────────────────────────────────────── */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, children, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`card-swap-item ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

/* ─── Helpers ───────────────────────────────────────────────────────────── */

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

/** Slot[0] = front (visible, no offset), Slot[n-1] = back (most offset) */
const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const snapToSlot = (el: HTMLElement, slot: Slot, skewY: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    opacity: 1,
    force3D: true,
  });

/* ─── CardSwap ──────────────────────────────────────────────────────────── */

interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  onCardPreview?: (index: number) => void;
  skewAmount?: number;
  easing?: 'elastic' | 'power';
  children: React.ReactNode;
}

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  onCardPreview,
  skewAmount = 6,
  easing = 'elastic',
  children,
}) => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  /* animation config */
  const cfg =
    easing === 'elastic'
      ? { ease: 'elastic.out(0.55,0.85)', durMove: 1.4, durDrop: 0.55, durReturn: 1.1 }
      : { ease: 'power3.inOut', durMove: 0.7, durDrop: 0.4, durReturn: 0.6 };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef<HTMLDivElement>()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  /* mutable refs that survive re-renders without re-running the effect */
  const orderRef = useRef<number[]>([]);
  const animatingRef = useRef(false);
  const pausedRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  /* ── responsive scale ── */
  useEffect(() => {
    const recalc = () => {
      const sw = window.innerWidth;
      const tw = (typeof width === 'number' ? width : parseInt(width as string) || 500);
      const needed = tw + childArr.length * cardDistance + 40;
      setScale(sw < needed ? (sw - 40) / needed : 1);
    };
    recalc();
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [width, cardDistance, childArr.length]);

  /* ── main GSAP effect ── */
  useEffect(() => {
    if (typeof window === 'undefined' || refs.length < 2) return;

    const total = refs.length;
    const dX = cardDistance * scale;
    const dY = verticalDistance * scale;

    /* initialise order */
    orderRef.current = Array.from({ length: total }, (_, i) => i);

    /* snap every card to its starting slot */
    orderRef.current.forEach((idx, pos) => {
      const el = refs[idx].current;
      if (el) snapToSlot(el, makeSlot(pos, dX, dY, total), skewAmount);
    });

    /* ── swap function ── */
    const swap = () => {
      if (animatingRef.current || pausedRef.current) return;
      if (orderRef.current.length < 2) return;

      animatingRef.current = true;

      /* snapshot current order */
      const currentOrder = [...orderRef.current];
      const frontIdx = currentOrder[0];           // card leaving the front
      const elFront = refs[frontIdx].current;
      if (!elFront) { animatingRef.current = false; return; }

      /* next order: front goes to the back */
      const nextOrder = [...currentOrder.slice(1), frontIdx];

      const tl = gsap.timeline({
        onComplete: () => {
          /* commit the new order */
          orderRef.current = nextOrder;
          animatingRef.current = false;
        },
      });
      tlRef.current = tl;

      /* 1. Front card: arc down then fade out */
      tl.to(elFront, {
        y: '+=380',
        z: -150,
        opacity: 0,
        skewY: 0,
        duration: cfg.durDrop,
        ease: 'power2.in',
      });

      /* 2. Every other card slides forward into its new slot (slot i-1) */
      tl.addLabel('promote', `-=${cfg.durDrop * 0.35}`);
      currentOrder.slice(1).forEach((idx, i) => {
        const el = refs[idx].current;
        if (!el) return;
        const targetSlot = makeSlot(i, dX, dY, total); // promoted by 1
        tl.to(
          el,
          {
            x: targetSlot.x,
            y: targetSlot.y,
            z: targetSlot.z,
            zIndex: targetSlot.zIndex,
            duration: cfg.durMove,
            ease: cfg.ease,
          },
          'promote'
        );
      });

      /* 3. Front card teleports off-screen below, then rises into back slot */
      const backSlot = makeSlot(total - 1, dX, dY, total);
      tl.addLabel('return', `promote+=${cfg.durMove * 0.55}`);

      /* teleport silently to starting position for the return arc */
      tl.set(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y + 260,
          z: backSlot.z,
          zIndex: backSlot.zIndex,
          skewY: skewAmount,
          opacity: 0,
        },
        'return'
      );

      /* rise into place */
      tl.to(
        elFront,
        {
          y: backSlot.y,
          opacity: 1,
          duration: cfg.durReturn,
          ease: 'power2.out',
        },
        'return+=0.05'
      );
    };

    /* ── interval ── */
    const start = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(swap, delay);
    };
    start();

    /* ── hover pause ── */
    let cleanup: (() => void) | undefined;
    if (pauseOnHover && containerRef.current) {
      const node = containerRef.current;
      const onEnter = () => {
        pausedRef.current = true;
        tlRef.current?.pause();
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
      const onLeave = () => {
        pausedRef.current = false;
        tlRef.current?.play();
        start();
      };
      node.addEventListener('mouseenter', onEnter);
      node.addEventListener('mouseleave', onLeave);
      cleanup = () => {
        node.removeEventListener('mouseenter', onEnter);
        node.removeEventListener('mouseleave', onLeave);
      };
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      tlRef.current?.kill();
      cleanup?.();
      /* kill any lingering tweens on card elements */
      refs.forEach((r) => { if (r.current) gsap.killTweensOf(r.current); });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, refs, scale]);

  /* ── render ── */
  const cardW = typeof width === 'number' ? width * scale : `calc(${width} * ${scale})`;
  const cardH = typeof height === 'number' ? height * scale : `calc(${height} * ${scale})`;

  const rendered = childArr.map((child, i) => {
    if (!isValidElement(child)) return child;
    const el = child as React.ReactElement<{
      style?: React.CSSProperties;
      onClick?: (e: React.MouseEvent) => void;
    }>;
    return cloneElement(el as any, {
      key: i,
      ref: refs[i],
      style: { width: cardW, height: cardH, ...(el.props.style ?? {}) },
      onClick: (e: React.MouseEvent) => {
        el.props.onClick?.(e);
        onCardClick?.(i);
        if (onCardPreview) {
          const elRef = refs[i].current;
          if (elRef) {
            gsap.to(elRef, { scale: 1.08, skewY: 0, duration: 0.18, ease: 'power2.out', overwrite: 'auto' });
            gsap.to(elRef, { scale: 1, skewY: skewAmount, duration: 0.4, delay: 0.22, ease: 'power2.inOut', overwrite: 'auto' });
          }
          onCardPreview(i);
        }
      },
    });
  });

  return (
    <div
      ref={containerRef}
      className="card-swap-container"
      style={{
        width: typeof width === 'number' ? width * scale : width,
        height: typeof height === 'number' ? height * scale : height,
        position: 'relative',
        perspective: '1000px',
      }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;