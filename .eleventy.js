const postcss = require("postcss");
const htmlmin = require("html-minifier");
module.exports = function(eleventyConfig) {
  /*
   each file will be filtered by each transform
   TODO add linters to 'eleventy' build, add JS/ES lint
   TODO add frontend test after build
   */

  // explicit + fast way to copy certain files and folders
  eleventyConfig.addPassthroughCopy("src/fonts");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/img");

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
