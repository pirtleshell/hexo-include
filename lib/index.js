/**
* hexo-include
* https://github.com/pirtleshell/hexo-include.git
* Copyright (c) 2015, Robert Pirtle
* Licensed under MIT License
*
* Inserts the raw contents of a file into a hexo markdown file.
*
* Syntax:
*   {% include path/to/file %}
*   Path is relative to your source directory.
*/

var include = require('./include')(hexo);

hexo.extend.tag.register('include', include, {asyn: true});
