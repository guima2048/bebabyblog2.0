/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://bebaby.app',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  outDir: 'public',
  basePath: process.env.NODE_ENV === 'production' ? '/blog' : '',
}; 