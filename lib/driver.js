var util = require('util')
  , EventEmitter = require('events').EventEmitter
  , Browser = require('zombie')
  , _mocha = require('mocha')
  ;

module.exports = Driver;

function Driver() {
  EventEmitter.call(this);
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
    ;

  this.browser.visit('file://' + path).then(function() {
    var window = self.browser.evaluate('window')
      , trialCount = 100
      , executeTests
      , id
      ;

    executeTests = function(mocha) {
      var result;
      mocha.setup(opts);
      result = mocha.run();
      if (result.failures > 0) {
        self.emit('error', new Error('Test failure'), result);
      } else {
        self.emit('success', result);
      }
    };

    id = setInterval(function() {
      if (trialCount <= 0) {
        return clearInterval(id);
      }

      var mocha = window.mocha;
      if (mocha) {
        clearInterval(id);
        executeTests(mocha);
      } else {
        trialCount--;
      }
    }, 10);
  });

  // Not supported `window.postMessage`.
  this.browser.evaluate('delete window.postMessage');
};
