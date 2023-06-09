/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|pdf|otf|worker\.(min\.)?js)$/i,
      type: 'asset'
    })
    return config
  }
}

module.exports = nextConfig
