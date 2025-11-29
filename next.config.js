/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // SEO and Performance optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
  
  // Image optimization
  images: {
    domains: ['placehold.co'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Compression
  compress: true,
  
  // Trailing slash handling
  trailingSlash: false,
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        // Sitemap and robots.txt caching
        source: '/(sitemap\\.xml|robots\\.txt)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400'
          }
        ]
      }
    ]
  },
  
  // Redirects for SEO (if needed)
  async redirects() {
    return [
      // Add any necessary redirects here
      // Example:
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ]
  },
  
  // Environment variables
  env: {
    SITE_URL: 'https://www.byltmedia.com',
  },
};

module.exports = nextConfig;
