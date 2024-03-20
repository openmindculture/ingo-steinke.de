const postcssCustomProperties = require('postcss-custom-properties');
module.exports = {
  plugins: [
    require('precss'),
    require('postcss-import'),
    postcssCustomProperties({
      preserve: true,
    }),
    require('cssnano')
  ]
}
