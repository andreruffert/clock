import Clock from './Clock';

function initApp() {
  const digitalTime = document.getElementById('js-digital-time');
  const clock = new Clock({
    selectors: {
      handHours: '#js-clock-hand-hours',
      handMinutes: '#js-clock-hand-minutes',
      handSeconds: '#js-clock-hand-seconds',
      digitalDisplay: '#js-digital-display'
    }
  });
}

document.addEventListener('DOMContentLoaded', initApp);
