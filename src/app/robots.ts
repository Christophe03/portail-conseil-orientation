import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.conseil-orientation-mali.com';
const COMMON_DISALLOWS = ['/api/', '/admin/', '/private/', '/temp/'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
      {
        userAgent: 'GoogleOther',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
      {
        userAgent: 'Claude-User',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: COMMON_DISALLOWS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
