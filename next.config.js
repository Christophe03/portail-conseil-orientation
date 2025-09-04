/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['conseil-orientation.com', 'cdn.conseil-orientation.com'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    NEXT_PUBLIC_APP_NAME: 'Conseil d\'Orientation',
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID || '',
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || '',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/android',
        destination: 'https://play.google.com/store/apps/details?id=com.tcd.conseil_orientation',
        permanent: true,
      },
      {
        source: '/ios',
        destination: 'https://apps.apple.com/app/conseil-orientation/id1234567890',
        permanent: true,
      },
      {
        source: '/apk',
        destination: '/downloads/conseil-orientation.apk',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
