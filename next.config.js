/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/blog' : '',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', '177.153.20.125', 'images.pexels.com', 'vercel.app'],
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  // Otimizações de performance
  poweredByHeader: false,
  compress: true,
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig; 