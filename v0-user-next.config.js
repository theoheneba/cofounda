/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['placeholder.com'], // Add any other domains you'll be loading images from
  },
}

module.exports = nextConfig

