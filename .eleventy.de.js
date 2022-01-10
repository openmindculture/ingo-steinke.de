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

  // redirect rules and domain configuration for netlify
  eleventyConfig.addPassthroughCopy('src/netlify.toml');
  // redirect rules for apache webhosting
  eleventyConfig.addPassthroughCopy('src/.htaccess');

  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true, removeComments: true, collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  // postcss shortcut for inline code; external css files are handles by postcss
  eleventyConfig.addPairedShortcode("postcss", require("./utils/transform-css"));
  return {
    dir: {
      input: 'src', data: '_data/de', output: 'dist'
    }, templateFormats: ['liquid']
  }
};
