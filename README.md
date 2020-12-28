# ingo-steinke.de

## Description

see [changelog](./CHANGELOG.md)

## Linter

```
npx stylelint "**/*.css" --fix
```

## Build

```
npm run build
```

### check, fix, and build manually

```
npx stylelint "**/*.css" --fix && eleventy && node_modules/postcss-cli/bin/postcss src/styles.css > dist/styles.css
```

## Deployment

- Commits to the master branch will trigger a production deployment by netlify.
- Commits to pull requests will trigger preview builds to a preview domain, e.g.
https://5fea0b9e2742820007364391--ingo-steinke.netlify.app

## TODO

* [x] to-do list
* [ ] description
* [x] link to changelog
* [x] set up local preview
* [x] set up deployment (JAMStack)
* [ ] set up css bundling (using [https://github.com/addyosmani/critical](critical)?)
* [ ] set up local testing
* [ ] add more content
* [ ] add demo, design, more fancy css stuff ...
* [ ] like dark theme switcher with system default
* [ ] language switcher with system default
