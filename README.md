# node-streamin

Provide a better streaming api for your module.

[![Build Status](https://secure.travis-ci.org/fent/node-streamin.png)](http://travis-ci.org/fent/node-streamin) [![Dependency Status](https://gemnasium.com/fent/node-streamin.svg)](https://gemnasium.com/fent/node-streamin)

# Usage

```js
var streamin = require('streamin');

// `io` can be a path to a file, a url, or a stream
var stream = streamin(io);
```

That's the gist of it. With this you can give your code a more conveniet API by allowing streams to be passed into your function and also consider the common use cases of files and urls as inputs or outputs.


# API
### streamin(io, [requestOptions])

If `io` is a path to a file, it will return a stream that points to a local file. If it's a url, a stream from a remote request will be returned. If it detects that `io` is already a stream, it returns it. Will also decompress a gzip/deflate compressed http stream.

`requestOptions` can be a hash of options passed to [request](https://github.com/mikeal/request).


# Install

    npm install streamin


# Tests
Tests are written with [mocha](http://visionmedia.github.com/mocha/)

```bash
npm test
```

# License
MIT
