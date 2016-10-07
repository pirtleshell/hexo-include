/**
* hexo-include
* https://github.com/pipirt/hexo-include.git
* Copyright (c) 2015, pipirt
* Licensed under the MIT Licensed
*
* Syntax:
*   {% include path/to/file %}
*/

'use strict';

var fs = require('hexo-fs');
var pathFn = require('path');

hexo.extend.tag.register('include', function include(args) {
    var path = pathFn.join(hexo.source_dir, args[0]);

    // exit if path is not defined
    if (!path) return;

    // check existence, if it does, check there is content, return content
    return fs.exists(path).then(function(exist) {
      if (exist) return fs.readFile(path);
    }).then(function(contents) {
      if (!contents) return;
      return contents;
    });
  }, {async: true}
);
