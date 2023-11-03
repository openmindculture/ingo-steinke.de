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

## Deployment: 

### Netlify CI (optional, currently deactivated)

- Commits to the master branch will trigger a production deployment by netlify.
- Commits to pull requests will trigger preview builds to a preview domain.

#### Distribution Directories

Distribution directories (`dist`, `dist_en`) are pushed to GitHub.
It is not necessary to re-build them on the "serverless" server,
Netlify can deploy the distributed content without further modification.

### Manual deployment: SFTP / SCP

Upload `dist` content to `ingo-steinke.de` and `dist_en` content to `ingo-steinke.com`.

## Content / localization

Text content can be edited in

```src/_data/{{ content.language }}/content.js```

to be used in liquid variables with the `content.` prefix.

My localization setup does not match eleventy's front matter handling,
but this proved a quick and maintainable way to get things done.

When starting to work with eleventy, in January 2021, I had not been able to find an official documentation
how to internationalize eleventy projects, and anything else I found seemed even more
counter-intuitive to me, so here we go.

## DNS setup for Netlify

We need to add DNS records for every domain not hosted directly on Netlify:

```
ingo-steinke.de.  IN  A     104.198.14.52
www           IN  CNAME ingo-steinke.netlify.app
```

```
ingo-steinke.com.  IN  A     104.198.14.52
www           IN  CNAME ingo-steinke-com.netlify.app
```

```
ingosteinke.de.  IN  A     104.198.14.52
www           IN  CNAME ingo-steinke.netlify.app
```

```
ingosteinke.com.  IN  A     104.198.14.52
www           IN  CNAME ingo-steinke-com.netlify.app
```

We must configure every domain in Netlify's domain settings as "Custom domains":

| pattern       | de                         | com                          |
| ---               |----------------------------|------------------------------|
| Default subdomain | `ingo-steinke.netlify.app` | `ingo-steinke-com.netlify.app` |
| Primary domain | `www.ingo-steinke.de`      | `www.ingo-steinke.com`         |
| Redirects automatically to primary domain | `ingo-steinke.de`          | `ingo-steinke.com`             |
| Domain alias | `ingosteinke.de`             | `ingosteinke.com`              |
| Domain alias | `www.ingosteinke.de`         | `www.ingosteinke.com`             |

Note that Netlify does not respect `.htaccess` Apache configuration files, but needs a `_redirects` file instead ([see Redirects and rewrites](https://docs.netlify.com/routing/redirects/)).

## Test

* `npm run eslint`

* `npm run stylelint`

* `npm run serve` &&

* `npm run codeceptjs` [CodeceptJS](https://codecept.io/) 

### export / update local tests to Testomat.io

* `TESTOMATIO=__$APIKEY__ npx check-tests@latest CodeceptJS "**/*{.,_}{test,spec}.js"`

### About Testing Tools and the War on Europe
  🇺🇦 CodeceptJS and Testomat.io were created in Ukraine. #StandWithUkraine

## Roadmap / TODO

https://github.com/openmindculture/ingo-steinke.de/issues/65
