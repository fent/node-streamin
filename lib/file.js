var fs = require('fs');
var Streamify = require('streamify');


/**
 * A file that can either be read or written to.
 *
 * @param (string) path
 * @param (Object) options
 */
module.exports = function file(path, options) {
  var stream = new Streamify();
  return stream;
};
