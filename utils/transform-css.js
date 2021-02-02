const path = require("path");
const postcss = require("postcss");
const postcssCustomProperties = require('postcss-custom-properties');

module.exports = async code => {
  const rawFilepath = path.join(__dirname, `../src/_includes/critical.css`);
  return postcss([
    require("precss"),
    require("postcss-import"),
    postcssCustomProperties({
        preserve: false,
    }),
    require("cssnano")
  ])
    .process(code, { from: rawFilepath })
    .then(result => result.css);
};
