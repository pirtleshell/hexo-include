/* eslint-env node, mocha */

var pathFn = require('path');
var should = require('chai').should();
var Hexo = require('hexo');
var fs = require('hexo-fs');

var hexo = new Hexo(pathFn.join(__dirname, 'include_test'));

var include = require('../lib/include.js')(hexo);

describe('Include tag', function() {
  var filePath = pathFn.join(hexo.source_dir, 'test_dir/test.html');
  var emptyPath = pathFn.join(hexo.source_dir, 'test_dir/empty.html');

  var fixture = [
    '<h1>go to sleep ya little bae</h1>',
    'if (tired && night){',
    '  sleep();',
    '}'
  ].join('\n');

  // returns the rendered contents
  function renderedContent(file) {
    return include([file]);
  }

  before(function() {
    // create files for testing
    fs.writeFileSync(filePath, fixture);
    fs.writeFileSync(emptyPath, '');
    return;
  });

  after(function() {
    // remove the testing arena
    return fs.rmdir(hexo.base_dir);
  });

  it('existing file', function() {
    return renderedContent('test_dir/test.html').then(function(result) {
      result.should.eql(fixture);
    });
  });

  it('empty file', function() {

    return renderedContent('test_dir/empty.html').then(function(result) {
      should.not.exist(result);
    });
  });

  it('nonexistent file', function() {
    return renderedContent('this/file/doesnt/exist.magic').then(function(result) {
      should.not.exist(result);
    });
  });
});
