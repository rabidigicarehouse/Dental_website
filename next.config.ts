import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV !== 'production';

function getPublicApiOrigin(): string | null {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    return null;
  }

  try {
    return new URL(apiBaseUrl).origin;
  } catch {
    console.warn('NEXT_PUBLIC_API_BASE_URL is not a valid absolute URL; it was omitted from the CSP.');
    return null;
  }
}

const connectSources = [
  "'self'",
  'https://api.emailjs.com',
  getPublicApiOrigin(),
].filter(Boolean);

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://flagcdn.com https://img.youtube.com",
  "media-src 'self' blob:",
  "frame-src 'self' https://maps.google.com https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
  `connect-src ${connectSources.join(' ')}`,
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  ...(isDevelopment ? [] : ['upgrade-insecure-requests']),
].join('; ');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: contentSecurityPolicy,
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(self), geolocation=(), payment=(), usb=(), browsing-topics=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/w40/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/favicon.ico',
        destination: '/favicon.png',
        permanent: true,
      },
      {
        source: '/tele-consult',
        destination: '/book-appointment',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
