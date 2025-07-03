// next.config.ts
import withPWA from 'next-pwa'
import type { NextConfig } from 'next'

const baseConfig: NextConfig = {
  reactStrictMode: true,
}

const withPwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

export default withPwaConfig(baseConfig)
