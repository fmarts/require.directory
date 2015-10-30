'use strict';

var fs        = require('fs');
var path      = require('path');
var set       = require('lodash.set');
var camelCase = require('lodash.camelcase');
var defaults  = require('lodash.defaults');


function processDir(modules, options) {
  return function loop(_path, str) {
    const files = fs.readdirSync(_path);
    files.forEach(function(file) {
      const filePath = path.resolve(_path, file);
      if (fs.statSync(filePath).isDirectory()) {
        loop(filePath, `${str}.${file}`);
      } 
      else if (~options.extensions.indexOf(path.extname(file))) {
        const objectPath = `${str}.${camelCase(file.replace(/\.[^/.]+$/, ''))}`;
        set(modules, objectPath, require(filePath));
      }
    });
  }
}

function reqdir(_path, _options) {
  let modules = {};

  const defaultOptions = {
    path: __dirname,
    extensions: ['.json', '.js', '.jsx'],
  };

  const options = defaults(_options || {}, defaultOptions);
  const dir     = path.join(path.dirname(module.parent.id), _path || options.path);

  try {
    fs.statSync(dir);
  } 
  catch(e) {
    throw new Error('path does not exist');
  }

  processDir(modules, options)(dir, '');

  return modules;
}

module.exports = reqdir;