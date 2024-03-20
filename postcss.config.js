const postcssCustomProperties = require('postcss-custom-properties');
module.exports = {
  plugins: [
    require('precss'),
    require('postcss-import')({
      skipDuplicates: true,
    }),
    postcssCustomProperties({
      preserve: true,
    }),
    require('cssnano')
  ]
}
