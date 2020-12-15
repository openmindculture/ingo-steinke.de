const postcss = require("postcss");
const htmlmin = require("html-minifier");
module.exports = function(eleventyConfig) {
  /*
   each file will be filtered by each transform
   TODO add linters to 'eleventy' build, add JS/ES lint
   TODO add frontend test after build
   */

  // explicit + fast way to copy certain files
  eleventyConfig.addPassthroughCopy("toml"); // for netlify.toml deploy configurations
  // copy images, later we might want to optimize before deployment
  eleventyConfig.addPassthroughCopy("jpg");
  eleventyConfig.addPassthroughCopy("png");
  eleventyConfig.addPassthroughCopy("webp");
  eleventyConfig.addPassthroughCopy("svg");
  eleventyConfig.addPassthroughCopy("ico");

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });

  module.exports = function(eleventyConfig) {
	  // Output directory: _site
	  // Copy `img/` to `_site/img`
	  eleventyConfig.addPassthroughCopy("img");
	  // Copy `css/fonts/` to `_site/css/fonts`
	  // If you use a subdirectory, it’ll copy using the same directory structure.
	  eleventyConfig.addPassthroughCopy("css/fonts");
	};


  // postcss shortcut for inline code; external css files are handles by postcss
  eleventyConfig.addPairedShortcode("postcss", require("./utils/transform-css"));
  return {
    dir: {
      input: "src",
      output: "dist"
    },
    templateFormats: ["liquid"]
  }
};
