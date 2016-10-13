/*
* Hexo include tag function
*
* Takes context. Exports function that grabs contents of file
* given a filename relavtive to source directory.
*/

var pathFn = require('path');
var fs = require('hexo-fs');

module.exports = function(ctx) {
  return function includeTag(args) {
    var path = pathFn.join(ctx.source_dir, args[0]);

    // exit if path is not defined
    if (!path) {
      console.warn("Include file path undefined.");
      return;
    }

    // check existence, if it does, check there is content, return content
    return fs.exists(path).then(function(exist) {
      if (!exist) {
        console.warn('Include file not found.');
        return;
      }
      return fs.readFile(path).then(function(contents) {
        if (!contents) {
          console.warn('Include file empty.');
          return;
        }
        return contents;
      });
    });
  };
};
