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

  eleventyConfig.addLiquidFilter('svgIcon', function(slug) {
    let markup = '<img src="img/icon-' + slug + '.svg"';
    markup += 'width="24" height="24"';
    markup += 'class="project-thumb project-thumb--' + slug +  '"'
    markup += 'loading="lazy" alt=""'
    markup += '>';
    return markup;
  });

  eleventyConfig.addLiquidFilter( 'unprefixedHumanReadableUrl', function(url) {
    url = url.replace(/^https?:\/\//, '');
    url = url.replace(/^www\./, '');
    url = url.replace(/^ingo-steinke\.de/, '');
    url = url.replace(/^ingo-steinke\.com/, '');
    url = url.replace(/^github.com/, '<img class="logo-inline no-print" src="img/logo-github.svg" width="32" height="32" alt="github.com"><span class="only-print">github.com</span>');
    url = url.replace(/^store.shopware.com(?:\/en)*/, '<img class="logo-inline no-print" src="img/logo-shopware.svg" width="32" height="32" alt="store.shopware.com"><span class="only-print">store.shopware.com</span>');
    url = url.replace(/\/$/, '');
    return url;
  });

  eleventyConfig.addPairedShortcode('projectgrid', async function(content) {
    let output = '<div class="grid-container grid-container--projects flip-box-container">';
    output += content;
    output += '</div>';
    return output;
    });

    // postcss shortcut for inline code; external css files are handles by postcss
    eleventyConfig.addPairedShortcode("postcss", require("./utils/transform-css"));
    };
