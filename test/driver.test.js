var Driver = require('../').Driver
  , expect = require('expect.js')
  ;

describe('Driver', function() {
  var driver;

  beforeEach(function() {
    driver = new Driver();
  });

  describe('#run()', function() {
    it('should emit "error" with failure test', function(done) {
      driver.on('error', function(error, result) {
        expect(error.name).to.eql('TestFailure');
        expect(result.failures).to.eql(1);
        done();
      });
      driver.run(__dirname+'/fixture/failure.html');
    });

    it('should emit "success" with success test', function(done) {
      driver.on('success', function(result) {
        expect(result.total).to.eql(1);
        expect(result.failures).to.eql(0);
        done();
      });
      driver.run(__dirname+'/fixture/success.html');
    });

    it('should support running multiple tests', function(done) {
      driver.on('success', function() {
        driver.on('error', function(error) {
          expect(error.name).to.eql('TestFailure');
          done();
        });
        driver.run(__dirname+'/fixture/failure.html');
      });
      driver.run(__dirname+'/fixture/success.html');
    });

    it('should emit "error" when test not run', function(done) {
      driver.on('error', function(error) {
        expect(error.name).to.eql('TestNotRun');
        done();
      });
      driver.run('not exist path');
    });
  });
});
