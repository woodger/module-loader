(function(require) {
  window.require = require;

  var scripts = document.getElementsByTagName('script');

  for (var i = 0; i < scripts.length; i++) {
    var script = scripts.item(i);

    if (script && script.hasAttribute('data-main')) {
      var data = script.getAttribute('data-main');
      var main = data.split(/\s*,\s*/);

      while ((url = main.shift())) {
        require(url);
      }
    }
  }
})((function() {
  var cache = {};
  var pending = {};

  var uploadScript = function(url, callback) {
    if (url in cache) {
      return callback(cache[url]);
    }

    if (pending[url] instanceof Array) {
      return pending[url].push(callback);
    }

    pending[url] = [ callback ];
    window.module = {};

    Object.defineProperty(module, 'exports', {
      set: function(value) {
        cache[url] = value;

        while ((callback = pending[url].shift())) {
          callback(value);
        }

        delete pending[url];
      }
    });

    var head = document.getElementsByTagName('head').item(0);
    var script = document.createElement('script');

    script.setAttribute('src', url);
    head.appendChild(script);
  };

  var require = function(urls, callback) {
    if (typeof urls === 'string') {
      urls = [ urls ];
    }

    queue([], callback);

    function queue(buffer, callback) {
      uploadScript(urls[buffer.length], function(module) {
        buffer.push(module);

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
