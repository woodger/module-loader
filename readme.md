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

* [Entry point](#entry-point)
* [window.require(urls, callback)](#windowrequireurls-callback)
* [window.require.cache](#windowrequirecache)

#### Entry point

The `data-main` attribute is a special attribute that `Module loader` will check to start script loading:

```html
<script data-main="scripts/index.js" src="/node_modules/module-loader/require.js"></script>
```

You will typically use a data-main script to await [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event) options and then load the first application module.

```js
document.addEventListener('DOMContentLoaded', function() {
  var head = document.getElementsByTagName('head').item(0);
  var elem = document.createElement('script');

  elem.setAttribute('src', '/node_modules/module-loader/require.js');
  elem.setAttribute('data-main', '/index.js');
  head.appendChild(elem);
});
```

With a `,` can specify multiple entry points by separate them.

#### window.require(urls, callback)

- `urls` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)> A case-sensitive string representing the paths for module.
- `callback` <[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)> a function to execute after the module is loaded.

This method takes a different approach to script loading than traditional <[script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)> tags.
The result of the function call is cached by listing a simple object in the [window.require.cache](#windowrequirepathcache) field.

Below `/index.js` uses the foo module, which imports the `foo` function:

**/index.js**

```js
require('/libs/foo.js', function(foo) {
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
