var streamin   = require('..')
  , assert     = require('assert')
  , fs         = require('fs')
  , Stream     = require('stream').Stream
  , NullStream = require('./nullstream');
  ;


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
