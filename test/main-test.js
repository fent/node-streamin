var streamin   = require('..');
var assert     = require('assert');
var fs         = require('fs');
var Stream     = require('stream').Stream;
var NullStream = require('./nullstream');


describe('Pass a path to a file', function() {
  it('Should return an instance of Stream', function() {
    var stream = streamin(__filename);
    stream.pipe(new NullStream());
    assert.ok(stream instanceof Stream);
  });
});


describe('Pass a url', function() {
  it('Should return an instance of Stream', function() {
    var stream = streamin('http://google.com');
    stream.destroy();
    assert.ok(stream instanceof Stream);
  });
});


describe('Pass a stream', function() {
  it('Should return an instance of Stream', function() {
    var stream = streamin(fs.createReadStream(__filename));
    stream.destroy();
    assert.ok(stream instanceof Stream);
  });
});
