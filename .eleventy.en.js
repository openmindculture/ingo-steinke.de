const htmlmin = require('html-minifier');
module.exports = function (eleventyConfig) {
  // explicit + fast way to copy certain files and folders
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/android-chrome-192x192.png');
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png');
  eleventyConfig.addPassthroughCopy('src/browserconfig.xml');
  eleventyConfig.addPassthroughCopy('src/site.webmanifest');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/favicon-16x16.png');
  eleventyConfig.addPassthroughCopy('src/favicon-32x32.png');
  eleventyConfig.addPassthroughCopy('src/mstile-150x150.png');
  eleventyConfig.addPassthroughCopy('src/2022-4-19-www.ingo-steinke.de-1793046390-report.pdf');
  eleventyConfig.addPassthroughCopy('src/2022-5-27-www.ingo-steinke.com-1503125752-report.pdf');

  // redirect rules and domain configuration for netlify
  eleventyConfig.addPassthroughCopy('src/netlify.toml');
  // redirect rules for apache webhosting
  eleventyConfig.addPassthroughCopy('src/.htaccess');

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        useShortDoctype: true, removeComments: true, collapseWhitespace: true
      });
    }
    return content;
  });

  // postcss shortcut for inline code; external css files are handles by postcss
  eleventyConfig.addPairedShortcode("postcss", require("./utils/transform-css"));
  return {
    dir: {
      input: 'src',
      data: '_data/en',
      output: 'dist_en'
    },
    templateFormats: ['liquid']
  }
};
