// next.config.mjs
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                 // enables `next export`
  basePath: isProd ? '/music-player-skin' : '',
  assetPrefix: isProd ? '/music-player-skin/' : '',
  images: { unoptimized: true },    // Next/Image optimization doesn't run on GH Pages
}

export default nextConfig
