var Driver = require('../').Driver
  , expect = require('expect.js')

describe('Driver', function() {
  var driver

  beforeEach(function() {
    driver = new Driver();
  });

  describe('#run()', function() {
    it('should emit "error" with failure test', function(done) {
      driver.on('error', function() {
        done()
      });
      driver.run(__dirname+'/fixture/failure.html');
    });

    it('should emit "success" with success test', function(done) {
      driver.on('success', function() {
        done();
      });
      driver.run(__dirname+'/fixture/success.html');
    });

    it('should support running multiple tests', function(done) {
      driver.on('success', function() {
        driver.on('error', function() {
          done();
        });
        driver.run(__dirname+'/fixture/failure.html');
      });
      driver.run(__dirname+'/fixture/success.html');
    });
  });
});
