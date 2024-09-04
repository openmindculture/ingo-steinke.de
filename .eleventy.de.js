module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(require('./.eleventy.common.js'));
  // all subdirectory/*.liquid are processed implicitly,
  // so we need to exclude the ones that don't match the current language
  eleventyConfig.ignores.add('src/services');
  eleventyConfig.ignores.add('src/_includes');
  eleventyConfig.ignores.add('src/_data');
  eleventyConfig.ignores.add('src/_data/de/projects');

  // explicit + fast way to copy certain files and folders
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/vcard');
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
  eleventyConfig.addPassthroughCopy('src/Shopware-6-Certified-Developer-Ingo-Steinke.pdf');
  eleventyConfig.addPassthroughCopy('src/Shopware-6-Certified-Developer-Ingo-Steinke-de.pdf');
  eleventyConfig.addPassthroughCopy('src/Ingo-Steinke-CV-Projects-Skills-2024-sustainable-web-developer.pdf');
  eleventyConfig.addPassthroughCopy('src/Ingo-Steinke-CV-Projekte-Skills-2024-nachhaltiger-Webentwickler.pdf');
  eleventyConfig.addPassthroughCopy('src/contact/send/index.php');

  // redirect rules and domain configuration for netlify
  // eleventyConfig.addPassthroughCopy('src/netlify.toml');
  // redirect rules for apache webhosting
  eleventyConfig.addPassthroughCopy('src/.htaccess');

  // postcss shortcut for inline code; external css files are handles by postcss
  eleventyConfig.addPairedShortcode("postcss", require("./utils/transform-css"));
  return {
    dir: {
      input: 'src',
      data: '_data/de',
      output: 'dist'
    },
    templateFormats: ['liquid']
  }
};
