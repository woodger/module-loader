# Module loader

[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/woodger/harp/blob/master/LICENSE)
[![Known Vulnerabilities](https://snyk.io/test/github/woodger/module-loader/badge.svg?targetFile=package.json)](https://snyk.io/test/github/woodger/module-loader?targetFile=package.json)

Simple and fast module loader for browser.

## Getting Started

### Installation

To use `Module loader` in your project, run:

```bash
npm i git+https://git@github.com/woodger/module-loader.git
```

#### Table of Contents

* [window.require](#windowrequirepath)
* [window.require.cache](#windowrequirecache)

#### window.require(urls, callback)

This method takes a different approach to script loading than traditional <[script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)> tags.
The result of the function call is cached by listing a simple object in the [window.require.cache](#windowrequirepathcache) field.

Below `index.js` uses the foo module, which imports the `Foo` class:

**/index.js**

```js
window.require(['/libs/foo'], function(foo) {
  console.log(foo());
});
```

The counter module is defined in `/libs/foo.js`:

**/libs/foo.js**

```js
module.exports = function() {
  return 'Hello!';
};
```

The module.exports property can be assigned a new value (such as a function or object).

#### window.require.cache

Modules are cached after the first time they are uploaded.


#### Browser compatibility

| Desktop           | Version |
|-------------------|:-------:|
| Chrome            | 5       |
| Edge              | Yes     |
| Firefox           | 4.0     |
| Internet Explorer | 9       |
| Opera             | 11.60   |
| Safari            | 5.1     |
