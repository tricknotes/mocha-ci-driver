# mocha CI driver

[![Build Status](https://secure.travis-ci.org/tricknotes/mocha-ci-driver.png)](http://travis-ci.org/tricknotes/mocha-ci-driver)

`mocha-ci-driver` is a driver what make test that is written by [mocha](https://github.com/visionmedia/mocha) for browser working on Node.js.

Your code and test for browser works on Node.js without rewriting for Node.js.

## Install

``` sh
$ cd YOUR_PROJECT_HOME
$ git clone git://github.com/tricknotes/mocha-ci-driver.git ./node_modules/mocha-ci-driver
```

## Usage

Setup:

Modify `./test/index.html`(Your test html)

``` html
<script>
  // Execute `mocha.run()` when accessed from browser
  if (!/Node.js/.test(navigator.appName)) {
    mocha.run();
  }
</script>
```

Add `./test/driver.js`

``` js
var Driver = require('mocha-ci-driver').Driver
  , basedir = '../'
  , port = 8080
  , driver = new Driver(basedir, port)

driver.run('/test/index.html');
```

And run

``` sh
$ node ./test/driver.js
```

### Optional

Use other reporter (default is `Dot`):

``` js
driver.run('/test/index.html', 'Spec');
```

Run multiple tests:

``` js
driver.run('/test/index1.html');
driver.run('/test/index2.html');
```

## Supported [mocha](https://github.com/visionmedia/mocha) version

Supported revision is later [visionmedia/mocha@a186b8dba1](https://github.com/visionmedia/mocha/commit/a186b8dba1079385b763186a3eacdbc24a556095) .

This revision is not tagged yet.

To use `mocha-ci-driver`, build `mocha` for your project.

``` sh
$ git clone git://github.com/visionmedia/mocha.git mocha
$ cd mocha
$ make clean && make
```

Use generated `mocha.js` to your html for test.

(I will publish to npm module after mocha tagged.)

## Test

``` sh
$ npm test
```

## License

(The MIT License)

Copyright (c) 2012 Ryunosuke SATO &lt;tricknotes.rs@gmail.com&gt;
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
