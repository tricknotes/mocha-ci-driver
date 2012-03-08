var util = require('util')
  , EventEmitter = require('events').EventEmitter
  , Browser = require('zombie')
  , _mocha = require('mocha')

function Driver() {
  this.browser = new Browser();
}

util.inherits(Driver, EventEmitter);

Driver.prototype.run = function(path, reporter) {
  var Reporter = _mocha.reporters[reporter || 'Dot']
    , self = this

  this.browser.visit('file://localhost' + path, function() {
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
