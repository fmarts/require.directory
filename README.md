req.dir
=======

Looking for `require()`'ing entire directories recursively into a single object?

This module provides an utility that exposes directories as objects that you can use. 

This folder structure:

    routes/
      foo.js
      bar.json
      folder/
        baz.jsx

Becomes this:
    
    var routes = {
      foo: {},
      bar: {},
      folder: {
        baz: {}
      }
    };

Installation
-----------
    npm i req.dir --save

Usage
-----
    var reqdir = require('req.dir');
    var routes = reqdir('./routes', { extensions: ['.js', '.json']}); // `extensions` is optional

    console.log(routes)
    // => { foo: { .. }, bar: { .. }, folder: { baz: { .. } } } 

Options
-------
`extensions` (optional): array of file extensions to load (default: `.js`, `.json`, `.jsx`)


TODO
----
* Accept array of paths to load multiple directories at once
