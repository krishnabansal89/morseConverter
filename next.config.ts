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
    ];
  },
};

export default nextConfig;
