/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.ilgusto-lille.fr',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'monthly',
  priority: 0.7,
  exclude: ['/404', '/500'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};