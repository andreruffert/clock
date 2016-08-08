import leftPad from 'left-pad';

class Clock {
  constructor(options) {
    this.el = {
      handHours: document.querySelector(options.selectors.handHours),
      handMinutes: document.querySelector(options.selectors.handMinutes),
      handSeconds: document.querySelector(options.selectors.handSeconds),
      digitalDisplay: document.querySelector(options.selectors.digitalDisplay)
    };
    this.interval = 1000;
    this.state = {
      now: null,
      delta: null,
      then: Date.now()
    };

    this.update();
  }

  update() {
    this.state.now = Date.now();
    this.state.delta = this.state.now - this.state.then;

    if (this.state.delta > this.interval) {
      const currentTime = this.getTime();
      this.updateClockHands(currentTime);
      this.updateDigitalDisplay(currentTime);
      this.state.then = this.state.now - (this.state.delta % this.interval);
    }

    requestAnimationFrame(() => this.update());
  }

  getTime() {
    const date = new Date(this.state.now);
    return {
      hours: date.getHours() % 12,
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    };
  }

  getClockAngle({hours, minutes, seconds}) {
    return {
      hours: 360 / 12 * hours,
      minutes: 360 / 60 * minutes,
      seconds: 360 / 60 * seconds,
    };
  }

  updateClockHands({hours, minutes, seconds}) {
    const angle = this.getClockAngle({hours, minutes, seconds});
    this.el.handHours.style.transform = `rotate(${angle.hours}deg)`;
    this.el.handMinutes.style.transform = `rotate(${angle.minutes}deg)`;
    this.el.handSeconds.style.transform = `rotate(${angle.seconds}deg)`;
  }

  updateDigitalDisplay({hours, minutes, seconds}) {
    this.el.digitalDisplay.textContent = `${leftPad(hours, 2, 0)}:${leftPad(minutes, 2, 0)}:${leftPad(seconds, 2, 0)}`;
  }
}

export default Clock;
