/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost', '177.153.20.125', "images.pexels.com"],
    unoptimized: true,
  },
  output: 'standalone',
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 5,
  },
  // Otimizações de performance
  poweredByHeader: false,
  compress: true,
  basePath: '/blog',
};

module.exports = nextConfig; 