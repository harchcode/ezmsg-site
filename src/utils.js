export function easeInOutQuad(dt, start, change, duration) {
  const dt2 = dt / (duration / 2);

  if (dt2 < 1) return (change / 2) * dt2 * dt2 + start;

  return (-change / 2) * ((dt2 - 1) * (dt2 - 3) - 1) + start;
}

export function tween(from, to, duration, onUpdate, easeFunc = easeInOutQuad) {
  return new Promise(resolve => {
    const change = to - from;
    const startTime = Date.now();

    let dt = 0;
    let currentValue = from;

    const raf = requestAnimationFrame || setTimeout;

    const animate = () => {
      dt = Date.now() - startTime;

      currentValue = easeFunc(dt, from, change, duration);
      onUpdate(currentValue);

      if (dt < duration) {
        raf(animate);
      } else {
        resolve();
      }
    };

    animate();
  });
}

export default {
  tween,
  easeInOutQuad
};
