var inherits = require('util').inherits;
var Stream   = require('stream').Stream;


/**
 * A writable stream that does nothing with the data it gets.
 *
 * @constructor
 * @extends (Stream)
 */
var NullStream = module.exports = function NullStream() {
  Stream.call(this);
  this.writable = true;
};

inherits(NullStream, Stream);


NullStream.prototype.write = function() {
  return true;
}

NullStream.prototype.destroy = NullStream.prototype.end = function() {
  this.writable = false;
};
