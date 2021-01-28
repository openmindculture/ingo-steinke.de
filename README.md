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

## TODO

* [x] to-do list
* [x] description
* [x] link to changelog
* [x] set up local preview
* [x] set up deployment (JAMStack)
* [x] set up css optimization
* [ ] set up local testing
* [x] add more content
* [ ] add demo, design, more fancy css stuff ...
* [ ] language switcher with system default
