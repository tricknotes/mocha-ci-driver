var Driver = require('../').Driver
  , expect = require('expect.js')

describe('Driver', function() {
  var driver
    , port = 13000

  beforeEach(function() {
    driver = new Driver(__dirname+'/../', ++port);
  });

  describe('initialized', function() {
    it('should have port to be listened', function() {
      expect(driver.port).to.be(port);
    });
  });

  describe('#run()', function() {
    it('should emit "error" with failure test', function(done) {
      driver.on('error', function() {
        done()
      });
      driver.run('/test/fixture/failure.html');
    });

    it('should emit "success" with success test', function(done) {
      driver.on('success', done);
      driver.run('/test/fixture/success.html');
    });

    it('should support running multiple tests', function(done) {
      driver.on('success', function() {
        driver.on('error', function() {
          done();
        });
        driver.run('/test/fixture/failure.html');
      });
      driver.run('/test/fixture/success.html');
    });
  });
});
