'use strict';

const fs = require('fs');
const path = require('path');
const set = require('lodash.set');
const camelCase = require('lodash.camelcase');
const defaults = require('lodash.defaults');


function processDir(modules, options) {
  return function loop(_path, str) {
    const files = fs.readdirSync(_path);
    files.forEach((file) => {
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

function requireDir(_path, _options) {
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

module.exports = requireDir;
