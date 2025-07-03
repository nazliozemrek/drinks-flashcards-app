// next.config.ts
import withPWA from 'next-pwa';
import type { NextConfig } from 'next';

const baseConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // any other config
};

// DO NOT include 'pwa' inside baseConfig
const withPwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

export default withPwaConfig(baseConfig);
