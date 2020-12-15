const postcss = require("postcss");
const htmlmin = require("html-minifier");
module.exports = function(eleventyConfig) {
  /*
   each file will be filtered by each transform
   TODO external css file must be processed (currently only html/liquid)
   TODO add linters to 'eleventy' build, add JS/ES lint
   TODO add frontend test after build
   */
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

  eleventyConfig.addTransform("postcss", function(content, outputPath) {
    if( outputPath.endsWith(".css") ) {
      let minified = postcss([
        require("precss"),
        require("postcss-import"),
        require("postcss-custom-selectors"),
        require("autoprefixer"),
        require("cssnano")
      ])
        .process(code, { from: rawFilepath })
        .then(result => result);
      return result;
    }
    return content;
  });

  eleventyConfig.addPairedShortcode("postcss", require("./utils/transform-css"));
  return {
    dir: {
      input: "src",
      output: "dist"
    },
    templateFormats: ["liquid", "css", "jpg", "png", "svg", "webp", "ico"]
  }
};
