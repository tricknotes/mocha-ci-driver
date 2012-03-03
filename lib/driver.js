var util = require('util')
  , EventEmitter = require('events').EventEmitter
  , express = require('express')
  , Browser = require('zombie')
  , _mocha = require('mocha')

function Driver(basedir, port) {
  this.browser = new Browser();
  this.app = express.createServer();
  this.app.use(express.static(basedir));
  this.port = port;
}

util.inherits(Driver, EventEmitter);

Driver.prototype.run = function(path, reporter) {
  var Reporter = _mocha.reporters[reporter || 'Dot']
    , self = this

  this.app.listen(this.port);

  this.browser.visit('http://localhost:' + this.port + path, function() {
    var mocha = self.browser.evaluate('mocha')
      , result

    result = mocha.run(Reporter);
    self.app.close();
    if (result.failures > 0) {
      self.emit('error', new Error('Test failure'), result);
    } else {
      self.emit('success', null, result);
    }
  });
}

module.exports = Driver;
