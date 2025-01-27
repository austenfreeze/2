import { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Optimization to improve performance for large apps
    config.module.rules.push({
      test: /\.(js|ts|jsx|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    })
    return config
  },
  env: {
    SC_DISABLE_SPEEDY: 'false', // Ensures styled-components performance in production
  },
  experimental: {
    // You can keep other experimental features here
  },
  images: {
    unoptimized: true, // Ensure Next.js handles image optimization
  },
}

module.exports = config
