require-d()
========

Looking for `require()`'ing entire directories into a single object?

Motivation
----------

Having a structure like this

    routes/
      index.js
      foo.js
      bar.json
      folder/
        baz.js

Instead of creating `index.js` files where you `module.export` everything manually like so:
    
    module.exports = {
      foo: require('./foo'),
      bar: require('./bar'),
      folder: {
        baz: require('./folder/baz')
      }
    }

You can instead `var routes = require('reqdir')('./routes')` and have everything inside an object.
    
    routes = { 
      routes: {
        foo: {},
        bar: {},
        folder: {
          baz: {}
        }
      }
    };


Instalation
-----------
    npm i require-d --save


Usage
-----
    var reqdir = require('require-d');
    var routes = reqdir('./routes');

    console.log(routes)
    // => { routes: { foo: { .. }, bar: { .. }, folder: { baz: { .. } } } }

Options
-------
`extensions`: array of file extensions to load


TODO
----
* Accept array of paths to load multiple directories at once
