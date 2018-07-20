const { expect } = require("chai");
const interval = require("../");

let i = 0;

const fn = () => {
  i++;
  return 1000;
};

const timer = interval(fn, 500);

it("Output format", () => {
  expect(timer).to.have.property("restart");
  expect(timer).to.have.property("restartNow");
  expect(timer).to.have.property("start");
  expect(timer).to.have.property("startNow");
  expect(timer).to.have.property("stop");
});

timer.start();

it("Timer start", function(done) {
  setTimeout(() => {
    timer.stop();
    expect(i).to.equal(2);
    done();
  }, 1600);
});
