const htmlmin = require('html-minifier-terser');

module.exports = function (eleventyConfig) {
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true, removeComments: true, collapseWhitespace: true
      });
    }
    return content;
  });

  eleventyConfig.addLiquidFilter("customLocalizedMonthNameFilter", function(monthParam) {
    let monthIndex = parseInt(monthParam);
    let monthNames = [
      '', 'January', 'February', 'March', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
    ]
    if (0 < monthIndex < 13) {
      return monthNames[monthIndex];
    } else {
      return '';
    }
  });

  eleventyConfig.addLiquidFilter("svgIcon", function(slug) {
    let markup = '<img src="img/icon-' + slug + '.svg"';
    markup += 'width="24" height="24"';
    markup += 'class="project-thumb project-thumb--' + slug +  '"'
    markup += 'loading="lazy" alt=""'
    markup += '>';
    return markup;
  });

  // postcss shortcut for inline code; external css files are handles by postcss
  eleventyConfig.addPairedShortcode("postcss", require("./utils/transform-css"));
};
