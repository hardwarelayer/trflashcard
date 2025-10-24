import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@refinedev/antd"],
  // Vercel optimized configuration
  serverExternalPackages: ['@supabase/supabase-js'],
  // Enable i18n routing
  async redirects() {
    return [
      {
        source: '/',
        destination: '/vi',
        permanent: true,
      },
    ]
  },
};

export default withNextIntl(nextConfig);
