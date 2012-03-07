var util = require('util')
  , EventEmitter = require('events').EventEmitter
  , Browser = require('zombie')
  , _mocha = require('mocha')

function Driver(basedir, port) {
  this.browser = new Browser();
  this.basedir = basedir;
}

util.inherits(Driver, EventEmitter);

Driver.prototype.run = function(path, reporter) {
  var Reporter = _mocha.reporters[reporter || 'Dot']
    , self = this

  console.log('file://localhost' + this.basedir + path);
  this.browser.visit('file://localhost' + this.basedir + path, function() {
    var mocha = self.browser.evaluate('mocha')
      , result

    result = mocha.run(Reporter);
    if (result.failures > 0) {
      self.emit('error', new Error('Test failure'), result);
    } else {
      self.emit('success', null, result);
    }
  });
}

module.exports = Driver;
