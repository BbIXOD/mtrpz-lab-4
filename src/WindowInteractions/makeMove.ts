import { DummyCell, Home, Human } from '../Cells/Cells.js';
import { CellFactory } from '../CellFactory.js';
import { moveDisplay, humanCountDisplay, gameOverModal, speedDisplay, } from '../window-data.js';
import { getRandomCellClass, fieldSizeX, fieldSizeY, field, } from './initializeField.js';
import { makeHumanIformationDissapiar, updateFieldImages, } from './initializeCells.js';

export let isGameOver: boolean = false;
let moveCount = 0;

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

export function changeMoveCount (newNumber: number) {
    moveCount = newNumber;
}

export function changeGameOver (state: boolean) {
    isGameOver = state;
}

function findHomeCell(): {x: number, y: number}[] {
    const homeCells: {x: number, y: number}[] = [];
    for (let y = 0; y < fieldSizeY; y++) {
      for (let x = 0; x < fieldSizeX; x++) {
        const cell = field.getCell(x, y);
        if (cell instanceof Home) {
          homeCells.push({x, y});
        }
      }
    }
    return homeCells;
}

function isInProhibitedZone(x: number, y: number, homeCells: {x: number, y: number}[]): boolean {
    const radius = 2;
    for (const homeCell of homeCells) {
      if (
        Math.abs(homeCell.x - x) <= radius &&
        Math.abs(homeCell.y - y) <= radius
      ) {
        return true;
      }
    }
    return false;
}
  
function performActions() {
    const homeCells = findHomeCell();
  
    for (let y = 0; y < fieldSizeY; y++) {
      for (let x = 0; x < fieldSizeX; x++) {
        const cell = field.getCell(x, y);
        cell.didAction = false;
      }
    }
    for (let y = 0; y < fieldSizeY; y++) {
      for (let x = 0; x < fieldSizeX; x++) {
        const cell = field.getCell(x, y);
        if (cell.didAction) continue;
        cell.action();
  
        if (cell instanceof DummyCell && !isInProhibitedZone(x, y, homeCells)) {
          if (Math.random() <= 0.005) {
            const CellClass = getRandomCellClass();
            CellFactory.createCell(CellClass, field, x, y);
          }
        }
      }
    }
  
    updateFieldImages();
}
  
export function updateDisplays() {
    moveDisplay!.textContent = `Move: ${Math.round(moveCount)}`;
    humanCountDisplay!.textContent = `Humans alive: ${countHumanCells()}`;
}

function countHumanCells(): number {
    let count = 0;
    for (let y = 0; y < fieldSizeY; y++) {
      for (let x = 0; x < fieldSizeX; x++) {
        const cell = field.getCell(x, y);
        if (cell instanceof Human) {
          count++;
        }
      }
    }
    return count;
}

export function makeNextMove() {
    performActions();
    moveCount++;
    updateDisplays();
    makeHumanIformationDissapiar();
  
    if (countHumanCells() >= 7) {
      stopTimer();
      isGameOver = true;
      gameOverModal.style.display = 'block';
    }
}

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
