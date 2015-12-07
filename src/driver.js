import Rx from 'rx';

function makeAnimationDriver () {
  return function animationDriver () {
    const animation$ = new Rx.Subject();

    let prevTime = new Date().valueOf();

    function tick (timestamp) {
      animation$.onNext({
          timestamp,
          delta: timestamp - prevTime
      });
      prevTime = timestamp;
      requestAnimationFrame(tick);
    }

    tick(prevTime);

    return animation$;
  };
}

module.exports = {
  makeAnimationDriver
};
