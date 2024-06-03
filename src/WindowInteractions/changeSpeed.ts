import { speedDisplay, } from '../index.js';
import { makeNextMove, } from './makeMove.js';

let timerSpeed = 1000;
let timerId: number | null = null;
let currentSpeedIndex = 0;

const speeds = [
  { value: 1000, name: '1x', picture: './pictures/1x_speed.png' },
  { value: 750, name: '1.5x', picture: './pictures/1.5x_speed.png' },
  { value: 500, name: '2x', picture: './pictures/2x_speed.png' },
  { value: 250, name: '2.5x', picture: './pictures/2.5x_speed.png' },
  { value: 2500, name: '0.25x', picture: './pictures/0.25x_speed.png' },
  { value: 2000, name: '0.5x', picture: './pictures/0.5x_speed.png' },
  { value: 1500, name: '0.75x', picture: './pictures/0.75x_speed.png' },
];
  
export function handleTimerMoveSpeed() {
    currentSpeedIndex = (currentSpeedIndex + 1) % speeds.length;
    timerSpeed = speeds[currentSpeedIndex].value;
    document.getElementById('buttonMoveSpeed')!.querySelector('img')!.src =
      speeds[currentSpeedIndex].picture;
    speedDisplay!.textContent = `Speed: ${speeds[currentSpeedIndex].name}`;
    if (timerId !== null) {
      stopTimer();
      startTimer();
    }
}
  
export function startTimer() {
    timerId = window.setInterval(makeNextMove, timerSpeed);
}
  
export function stopTimer() {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
}
