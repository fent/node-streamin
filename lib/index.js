var zlib      = require('zlib');
var request   = require('request');
var filed     = require('filed');
var streamify = require('streamify');


/**
 * Returns true if `io` is a stream.
 *
 * @param {Stream|Object} io
 * @return {Boolean}
 */
function isStream(io) {
  return typeof io === 'object' &&
    (
      // Readable stream.
      (typeof io.pipe === 'function' && typeof io.readable === 'boolean' &&
       io.readable) ||
      // Writable stream.
      (typeof io.write === 'function' && typeof io.writable === 'boolean' &&
       io.writable)
    );
}


/**
 * Used to test if a string is a URL.
 */
var isURL = /^https?:/;


/**
 * Allows `io` to be a path to a file, a url, or a stream.
 *
 * @param {String|Stream} io
 * @param {!Object} requestOptions
 * @return {Stream}
 */
module.exports = function streamin(io, requestOptions) {

  if (isStream(io)) {
    return io;

  } else if (typeof io === 'string') {
    if (isURL.test(io)) {
      // Create a stream substitute that will be returned.
      // This is used in case the response data is compressed.
      // Thanks to @solatis for originally implementing this.
      var stream = streamify();
      requestOptions = requestOptions || {};
      requestOptions.url = io;
      requestOptions.headers = requestOptions.headers || {};
      requestOptions.headers['Accept-Encoding'] = 'gzip, deflate';

      var req = request(requestOptions);
      req.on('error', function(err) {
        stream.emit('error', err);
      });
      req.on('response', function(response) {
        // If the response data is encoded with an algorithm that we
        // recognize, then decode it.
        switch (response.headers['content-encoding']) {
        case 'gzip':
          stream.resolve(req.pipe(zlib.createGunzip()));
          break;
        case 'defalte':
          stream.resolve(req.pipe(zlib.createInflate()));
          break;
        default:
          // Otherwise pipe the raw data.
          stream.resolve(req);
        }
      });

      stream.destroy = req.destroy.bind(req);
      return stream;

    } else {
      return filed(io);
    }

  } else {
    throw new TypeError('`io` is not a stream or a string');
  }
};
