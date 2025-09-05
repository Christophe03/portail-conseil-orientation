/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://conseil-orientation-mali.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/', '/temp/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/', '/temp/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/', '/temp/'],
      },
    ],
    additionalSitemaps: [
      'https://conseil-orientation-mali.com/sitemap.xml',
    ],
    host: 'https://conseil-orientation-mali.com',
  },
  exclude: [
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/private/*',
    '/404',
    '/500',
  ],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Priorités personnalisées par page
    let priority = 0.7;
    let changefreq = 'weekly';
    
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path === '/about') {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/docs') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/download') {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path === '/features') {
      priority = 0.8;
      changefreq = 'weekly';
    } else if (path === '/support') {
      priority = 0.7;
      changefreq = 'weekly';
    } else if (path === '/privacy') {
      priority = 0.5;
      changefreq = 'monthly';
    } else if (path.startsWith('/downloads/')) {
      priority = 0.8;
      changefreq = 'monthly';
    } else if (path.startsWith('/docs/')) {
      priority = 0.6;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://conseil-orientation-mali.com${path}`,
          hreflang: 'fr',
        },
        {
          href: `https://conseil-orientation-mali.com${path}`,
          hreflang: 'x-default',
        },
      ],
    };
  },
};
