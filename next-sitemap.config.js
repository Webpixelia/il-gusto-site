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
  additionalPaths: async (config) => {
    try {
      const response = await fetch(`${process.env.STRAPI_API_URL || 'http://localhost:1337'}/api/pages`);
      const data = await response.json();
      
      if (!data || !data.data || !Array.isArray(data.data)) {
        return [];
      }

      return data.data
        .filter(page => page && page.Slug)
        .map(page => ({
          loc: `/${page.Slug}`,
          changefreq: 'monthly',
          priority: 0.7,
          lastmod: new Date(page.updatedAt).toISOString(),
        }));
    } catch (error) {
      return [];
    }
  },
} 