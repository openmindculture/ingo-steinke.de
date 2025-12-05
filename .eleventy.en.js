module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(require('./.eleventy.default.js'));
  // all subdirectory/*.liquid are processed implicitly,
  // so we need to exclude the ones that don't match the current language
  eleventyConfig.ignores.add('src/webseiten-klimafreundlich-barrierefrei-optimieren/index.liquid');
  eleventyConfig.ignores.add('src/wordpress-website-nachhaltig-optimieren-lassen/index.liquid');
  eleventyConfig.ignores.add('src/zertifizierter-shopware-6-frontend-webentwickler/index.liquid');
  eleventyConfig.ignores.add('src/leistungen');
  eleventyConfig.ignores.add('src/projekte');
  eleventyConfig.ignores.add('src/impact_de');
  eleventyConfig.ignores.add('src/impact_en'); // TODO reactivate when ready
  eleventyConfig.ignores.add('src/_includes');
  eleventyConfig.ignores.add('src/_data');
  eleventyConfig.ignores.add('src/_data/en/projects');

  // explicit + fast way to copy certain files and folders
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/vcard');
  eleventyConfig.addPassthroughCopy('src/android-chrome-192x192.png');
  eleventyConfig.addPassthroughCopy('src/android-chrome-512x512.png');
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png');
  eleventyConfig.addPassthroughCopy('src/site.webmanifest');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/2022-4-19-www.ingo-steinke.de-1793046390-report.pdf');
  eleventyConfig.addPassthroughCopy('src/2022-5-27-www.ingo-steinke.com-1503125752-report.pdf');
  eleventyConfig.addPassthroughCopy('src/Shopware-6-Certified-Developer-Ingo-Steinke.pdf');
  eleventyConfig.addPassthroughCopy('src/Shopware-6-Certified-Developer-Ingo-Steinke-de.pdf');
  eleventyConfig.addPassthroughCopy('src/Ingo-Steinke-CV-Projects-Skills-2024-sustainable-web-developer.pdf');
  eleventyConfig.addPassthroughCopy('src/Ingo-Steinke-CV-Projects-Skills-2025-sustainable-web-developer.pdf');
  eleventyConfig.addPassthroughCopy('src/Ingo-Steinke-CV-Projekte-Skills-2024-nachhaltiger-Webentwickler.pdf');
  eleventyConfig.addPassthroughCopy('src/Ingo-Steinke-CV-Projekte-Skills-2025-nachhaltiger-Webentwickler.pdf');
  eleventyConfig.addPassthroughCopy('src/Ingo-Steinke-Frontend-Web-Entwickler-CV-2025-10.pdf');
  eleventyConfig.addPassthroughCopy('src/contact/send/index.php');

  // redirect rules and domain configuration for netlify
  // eleventyConfig.addPassthroughCopy('src/netlify.toml');
  // redirect rules for apache webhosting
  eleventyConfig.addPassthroughCopy('src/.htaccess');

  eleventyConfig.addLiquidFilter("appendCurrentLanguageSlug", function(text) {
    return text + 'en';
  });

  return {
    dir: {
      input: 'src',
      data: '_data/en',
      output: 'dist_en'
    },
    templateFormats: ['liquid']
  }
};
