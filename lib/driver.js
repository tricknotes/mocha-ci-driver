var util = require('util')
  , EventEmitter = require('events').EventEmitter
  , Browser = require('zombie')
  , _mocha = require('mocha')

function Driver() {
  this.browser = new Browser();
}

util.inherits(Driver, EventEmitter);

Driver.prototype.run = function(path, options) {
  if (!options) {
    options = {};
  }
  var Reporter = _mocha.reporters[options.reporter || 'Dot']
    , self = this
    , opts = {
        reporter: Reporter
      , ui: options.ui || 'bdd'
      , timeout: options.timeout
    }

  // Not supported `window.postMessage`.
  this.browser.evaluate('delete window.postMessage');

  this.browser.visit('file://' + path, function() {
    setTimeout(function() {
      var mocha = self.browser.evaluate('mocha')
        , result

      mocha.setup(opts);
      result = mocha.run();
      if (result.failures > 0) {
        self.emit('error', new Error('Test failure'), result);
      } else {
        self.emit('success', result);
      }
    }, 500);
  });
}

module.exports = Driver;
