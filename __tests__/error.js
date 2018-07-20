const { expect } = require("chai");
const interval = require("../");

const fn = () => {
  throw "error";
};

let errors = "";

const timer = interval(fn, 500, {
  ignoreErrors: true,
  errorCb: err => {
    errors += err;
  }
});

timer.startNow();

it("Timer startNow + error", function(done) {
  setTimeout(() => {
    timer.stop();
    expect(errors).to.equal("errorerror");
    done();
  }, 600);
});
