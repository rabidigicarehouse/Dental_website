import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  // images: {
  //   unoptimized: true,
  // },
  async redirects() {
    return [
      {
        source: '/tele-consult',
        destination: '/book-appointment',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
