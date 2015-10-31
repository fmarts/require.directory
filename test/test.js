var path   = require('path');
var expect = require('chai').expect;
var reqdir = require('..');

describe('require a directory', function() {
  var modules = {};
  var error;

  it('should export modules from a directory', function() {
    modules = reqdir('./fixtures');
    expect(modules).to.be.an('object');
    expect(modules).to.have.all.keys(['foo', 'bar', 'folder']);
    expect(modules.foo).to.be.an.instanceof(Function);
    expect(modules.folder.baz).to.be.an.instanceof(Function);
    expect(modules.bar).to.be.an('object');
  });

  it('should filter files using the `extensions` option', function() {
    modules = reqdir('./fixtures', { extensions: ['.js', '.jsx'] });
    expect(modules).to.be.an('object');
    expect(modules).to.have.property('foo');
    expect(modules).to.have.property('folder');
    expect(modules).to.not.have.property('bar');
    expect(modules.folder).to.have.property('baz');
  });

  it('should return an empty object when no files are being exported', function() {
    modules = reqdir('./fixtures', { extensions: ['.c'] });
    expect(modules).to.be.empty;
  });

  it('should throw an error when `path` does not exist', function() {
    error = reqdir.bind(null, './foobar');
    expect(error).to.throw(Error, 'path does not exist');
  });
});