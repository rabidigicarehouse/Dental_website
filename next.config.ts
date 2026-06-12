import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
