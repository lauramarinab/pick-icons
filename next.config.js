const withImages = require('next-images')

module.exports = withImages({
  dynamicAssetPrefix: true,
  webpack(config, options) {
    return config
  }
})