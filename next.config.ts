import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/morse-code-chart',
        destination: '/charts/morse-code-chart.pdf',
        permanent: true, // Set to true for permanent redirect, false for temporary
      },
      {
        source: '/international-morse-code',
        destination: '/international-morse-code-translator',
        permanent: true, // Set to true for permanent redirect, false for temporary
      },
      {
        source: '/morse-code-key',
        destination: '/morse-code-keyer',
        permanent: true,
      },
      {
        source: '/ads.txt',
        destination: 'https://adstxt.journeymv.com/sites/1be13a1a-df64-40e6-bd06-69aaa289173d/ads.txt',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
