# ingo-steinke.de

## Description

see [changelog](./CHANGELOG.md)

This is a screenshot after the relaunch in 2021:

![screenshot](_screenshots/screenshot-ingo-steinke-de.jpg)

## Requirements

- [npm](https://www.npmjs.com)
- [eleventy](https://www.11ty.dev/) (global path: `npm install -g @11ty/eleventy`)
- a computer with an internet connection

## Edit Content: Project Structure

- `src/index.liquid` (site structure, image tags etc.)
- `src/_data/**/content.js` (localized strings)
- `img` (image files)
- `styles.css`, `_includes/*.css`(styles: CSS + PostCSS)

## Build

```
npm run build
```

## Deployment

- Commits to the master branch will trigger a production deployment by netlify.
- Commits to pull requests will trigger preview builds to a preview domain.

### Distribution Directories

Distribution directories (`dist`, `dist_en`) are pushed to GitHub.
It is not necessary to re-build them on the "serverless" server,
Netlify can deploy the distributed content without further modification.

## Content / localization

Text content can be edited in

```src/_data/{{ content.language }}/content.js```

to be used in liquid variables with the `content.` prefix.

My localization setup does not match eleventy's front matter handling,
but this proved a quick and maintainable way to get things done.

When starting to work with eleventy, in January 2021, I had not been able to find an official documentation
how to internationalize eleventy projects, and anything else I found seemed even more
counter-intuitive to me, so here we go.

## DNS setup for netlify

```
ingo-steinke.de.  IN  A     104.198.14.52
www           IN  CNAME ingo-steinke.netlify.app
```

## Test

* npm run eslint

* npm run stylelint

* TODO evaluate [CodeceptJS](https://codecept.io/) as a replacement for cypress, jest, storybook, storyshots

## Roadmap / TODO

https://trello.com/b/vhYtCj88/isd20-relaunch
