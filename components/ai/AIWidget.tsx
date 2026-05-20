"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, Mic, Send, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ChatBox from "./ChatBox";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
}

const INTENTS = [
  { keywords: ["hello", "hi", "hey"], response: "Hi, I'm your dental care AI advisor! How can I help you manage your dental appointments today?" },
  { keywords: ["booking", "reserve", "appointment"], response: "You can schedule an appointment directly using our online booking system. Would you like me to show you the way?" },
  { keywords: ["price", "cost"], response: "Our pricing is transparent and depends on the treatment. Most cleanings start from $99." },
];

export default function AIWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [stickyHidden, setStickyHidden] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hi, I'm your dental care AI advisor! How do you currently manage your dental health and follow-ups?", sender: "ai" }
  ]);

  useEffect(() => {
    setMounted(true);
    // Auto-open on desktop (≥1024px), stay closed on mobile
    if (window.innerWidth >= 1024) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      document.body.classList.add("ai-widget-open");
    } else {
      document.body.classList.remove("ai-widget-open");
    }
    window.dispatchEvent(new Event('resize'));
  }, [isOpen, mounted]);

  // Hide the sticky social bar when extra-wrap (side panel) is open
  // OR when scrolled near the footer. Re-show otherwise.
  useEffect(() => {
    if (!mounted) return;
    const checkVisibility = () => {
      const extraWrap = document.getElementById('extra-wrap');
      const extraOpen = extraWrap?.classList.contains('open') ?? false;
      const footer = document.querySelector('footer');
      let nearFooter = false;
      if (footer) {
        const rect = footer.getBoundingClientRect();
        nearFooter = rect.top < window.innerHeight - 80;
      }
      setStickyHidden(extraOpen || nearFooter);
    };
    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);
    const extraWrap = document.getElementById('extra-wrap');
    let observer: MutationObserver | null = null;
    if (extraWrap) {
      observer = new MutationObserver(checkVisibility);
      observer.observe(extraWrap, { attributes: true, attributeFilter: ['class'] });
    }
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
      observer?.disconnect();
    };
  }, [mounted]);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSendClick = () => {
    if (inputRef.current) {
      handleSendMessage(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  // Mouse tracking for animated widget
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = clientX - window.innerWidth / 2;
      const moveY = clientY - window.innerHeight / 2;
      mouseX.set(moveX);
      mouseY.set(moveY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Speech Recognition Logic
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleSendMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const talkingVideoRef = useRef<HTMLVideoElement>(null);

  // ✅ FIXED: Use voiceschanged event instead of polling interval
  const [femaleVoice, setFemaleVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    const pickFemaleVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      // Ordered list of preferred female voice names
      const preferredNames = [
        "Microsoft Zira",
        "Samantha",
        "Google UK English Female",
        "Karen",
        "Moira",
        "Tessa",
        "Fiona",
        "Microsoft Aria",
        "Microsoft Jenny",
        "Microsoft Salli",
        "Joanna",
        "Kendra",
      ];

      // Try exact preferred name matches first
      const voice =
        preferredNames.reduce<SpeechSynthesisVoice | null>((found, name) => {
          return found ?? (voices.find(v => v.name.includes(name)) ?? null);
        }, null) ??
        // Fallback: any English voice with a female-sounding name
        voices.find(v =>
          v.lang.startsWith("en") &&
          /female|woman|girl|zira|aria|jenny|salli|joanna|kendra|samantha/i.test(v.name)
        ) ??
        null;

      if (voice) setFemaleVoice(voice);
    };

    // Try immediately in case voices are already cached (common in Chrome on reload)
    pickFemaleVoice();

    // voiceschanged fires reliably when browser finishes loading voices
    window.speechSynthesis.addEventListener("voiceschanged", pickFemaleVoice);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pickFemaleVoice);
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.pitch = 1.8;
    utterance.rate = 1.0;

    utterance.onstart = () => {
      setIsSpeaking(true);
      if (talkingVideoRef.current) {
        talkingVideoRef.current.playbackRate = 1.5;
        talkingVideoRef.current.play().catch(() => { });
      }
    };

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [femaleVoice]); // ✅ FIXED: femaleVoice added as dependency so speak() always uses latest voice

  const handleSendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "I'm here to help! Please try asking about our dental services or booking.";
      const lowerText = text.toLowerCase();
      for (const intent of INTENTS) {
        if (intent.keywords.some(keyword => lowerText.includes(keyword))) {
          responseText = intent.response;
          break;
        }
      }
      const aiMsg: Message = { id: (Date.now() + 1).toString(), text: responseText, sender: "ai" };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
      speak(responseText);
    }, 1000);
  }, [speak]);

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  if (!mounted) return null;

  return (
    <>
      {/* Integrated Social Hub - Persistent */}
      <div
        className={`fixed z-[9999] ai-widget-floating-container flex flex-col items-center gap-3 transition-all duration-500 ease-in-out ${isOpen ? 'ai-panel-open' : ''} ${stickyHidden ? 'sticky-hidden' : ''}`}
      >
        {/* Social Icons Stack */}
        <div className="sticky-social-bar-integrated items-center justify-center">
          <Link href="https://www.youtube.com/@askadentistaskdr.harvey7701" target="_blank" className="social-icon-btn">
            <Image src="/social icons/youtube.png" alt="YouTube" width={20} height={20} className="w-4 h-4 lg:w-5 lg:h-5 object-contain" />
          </Link>
          <Link href="https://www.facebook.com/UpperEastDental/" target="_blank" className="social-icon-btn">
            <Image src="/social icons/facebook.png" alt="Facebook" width={20} height={20} className="w-4 h-4 lg:w-5 lg:h-5 object-contain" />
          </Link>
          <Link href="https://www.instagram.com/uppereastdentalnyc/?hl=en" target="_blank" className="social-icon-btn">
            <Image src="/social icons/instagram.png" alt="Instagram" width={20} height={20} className="w-4 h-4 lg:w-5 lg:h-5 object-contain" />
          </Link>
          <Link href="https://twitter.com/uppereastdental" target="_blank" className="social-icon-btn">
            <Image src="/social icons/twitter.png" alt="X (Twitter)" width={20} height={20} className="w-4 h-4 lg:w-5 lg:h-5 object-contain" />
          </Link>
          <Link href="https://www.linkedin.com/in/shardeharvey/?_l=en_US" target="_blank" className="social-icon-btn">
            <Image src="/social icons/linkedin.png" alt="LinkedIn" width={20} height={20} className="w-4 h-4 lg:w-5 lg:h-5 object-contain" />
          </Link>

          {/* AI Toggle Button - Premium Emblem Trigger */}
          {!isOpen && (
            <motion.button
              whileHover={{ scale: 1.15, translateY: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white shadow-lg flex items-center justify-center overflow-hidden border border-gray-100 group"
            >
              <Image
                src="/ai avatar.png"
                alt="AI Assistant"
                fill
                priority
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </motion.button>
          )}
        </div>
      </div>

      {/* Side-Panel Assistant */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 right-0 lg:top-0 z-[9999] w-full lg:w-[300px] 2xl:w-[420px] h-[85vh] lg:h-full bg-white border border-gray-100 lg:border-none lg:border-l rounded-t-[32px] lg:rounded-none flex flex-col overflow-hidden pointer-events-auto shadow-[0_-20px_50px_rgba(0,0,0,0.15)] lg:shadow-none ai-widget-side-panel"
          >
            {/* Header */}
            <div className="p-3 2xl:p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2 2xl:gap-3">
                <span className="font-bold text-gray-900 tracking-tight text-sm 2xl:text-lg">UpperEast</span>
                <div className="w-1 h-1 rounded-full bg-primary" />
                <span className="text-[8px] 2xl:text-[10px] font-black text-gray-400 uppercase tracking-widest">AI Advisor</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 2xl:p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Avatar Section */}
            <div className="p-3 2xl:p-6 pb-1">
              <div className="relative aspect-[16/10] rounded-xl 2xl:rounded-3xl overflow-hidden shadow-lg group border-[3px] 2xl:border-[6px] border-gray-50/50 bg-black">
                {/* Listening Video (Idle) */}
                <video
                  src="/listening.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className={`absolute inset-0 w-full h-full object-cover bg-black transition-opacity duration-300 ${isSpeaking ? 'opacity-0' : 'opacity-100'}`}
                  style={{ backgroundColor: 'black' }}
                />

                {/* Talking Video (Speaking State) */}
                <video
                  ref={talkingVideoRef}
                  src="/talking.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className={`absolute inset-0 w-full h-full object-cover bg-black transition-opacity duration-300 ${isSpeaking ? 'opacity-100' : 'opacity-0'}`}
                  style={{ backgroundColor: 'black' }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col items-center justify-end pb-3 2xl:pb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleVoice}
                    className={`px-4 2xl:px-8 py-2 2xl:py-3.5 rounded-full text-[9px] 2xl:text-[12px] font-black flex items-center gap-1.5 2xl:gap-2 shadow-2xl border transition-all z-10 ${isListening
                      ? "bg-red-500 text-white border-red-400 animate-pulse"
                      : "bg-white text-primary border-white/50"
                      }`}
                  >
                    <Mic size={12} className={isListening ? "text-white" : "text-red-500"} />
                    {isListening ? "Listening..." : "Speak with UpperEast"}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-hidden px-3 2xl:px-6 py-2 2xl:py-4">
              <ChatBox
                messages={messages}
                onSendMessage={handleSendMessage}
                isTyping={isTyping}
                isThryvStyle={true}
              />
            </div>

            {/* Footer */}
            <div className="p-3 2xl:p-6 bg-white border-t border-gray-100 space-y-2 2xl:space-y-4">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask UpperEast"
                  className="w-full bg-gray-50 border border-gray-100 rounded-lg 2xl:rounded-2xl px-3 2xl:px-6 py-2.5 2xl:py-4 pr-16 2xl:pr-24 text-[12px] 2xl:text-[14px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:bg-white transition-all shadow-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onSendClick();
                    }
                  }}
                />
                <div className="absolute right-1.5 2xl:right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                  <button onClick={toggleVoice} className={`p-1.5 2xl:p-2 transition-colors ${isListening ? "text-red-500" : "text-gray-400 hover:text-primary"}`}>
                    <Mic size={16} />
                  </button>
                  <button onClick={onSendClick} className="p-1.5 2xl:p-2 text-primary hover:scale-110 transition-transform">
                    <Send size={16} />
                  </button>
                </div>
              </div>

              <div className="text-[7px] 2xl:text-[9px] text-gray-300 text-center font-bold uppercase tracking-[0.15em] 2xl:tracking-[0.3em]">
                Secure interaction encrypted by UpperEast AI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}