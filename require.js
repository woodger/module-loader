(function(require) {
  window.require = require;
  var scripts = document.getElementsByTagName('script');

  for (var i = 0; i < scripts.length; i++) {
    var script = scripts.item(i);

    if (script && script.hasAttribute('data-main')) {
      return require(
        script.getAttribute('data-main')
      );
    }
  }

  throw new Error('Not found [data-main] entry point');
})((function() {
  var cache = {};

  var uploadScript = function (url, callback) {
    if (url in cache) {
      return callback(cache[url]);
    }

    var script = document.createElement('script');
    var module = {};
    var exports = {};

    var readymodule = new Event('readymodule');

    Object.defineProperty(module, 'exports', {
      set: function(value) {
        exports = value;
        script.dispatchEvent(readymodule);
      },
      get: function() {
        return exports;
      }
    });

    window.module = module;

    var listener = function(event) {
      script.removeEventListener('readymodule', listener, false);
      callback(
        cache[url] = module
      );
    };

    script.setAttribute('src', url);
    script.addEventListener('readymodule', listener, false);

    var head = document.getElementsByTagName('head').item(0);

    if (!head) {
      throw new Error('Expected to find a HEAD tag in document');
    }

    head.appendChild(script);
  };

  var require = function(urls, callback) {
    if (typeof urls === 'string') {
      urls = [ urls ];
    }

    queue([], callback);

    function queue(buffer, callback) {
      uploadScript(urls[buffer.length], function(module) {
        buffer.push(module.exports);

        if (buffer.length === urls.length) {
          if (typeof callback === 'function') {
            callback.apply(undefined, buffer);
          }

          return;
        }

        queue(buffer, callback);
      });
    }
  };

  require.cache = cache;
  return require;
})());
