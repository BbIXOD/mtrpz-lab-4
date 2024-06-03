import { DummyCell, Home, Human } from '../Cells/Cells.js';
import { CellFactory } from '../CellFactory.js';
import { moveDisplay, humanCountDisplay, gameOverModal, } from '../index.js';
import { getRandomCellClass, fieldSizeX, fieldSizeY, field, } from './initializeField.js';
import { makeHumanIformationDissapiar, updateFieldImages, } from './initializeCells.js';
import { stopTimer, } from './changeSpeed.js';

export let isGameOver: boolean = false;
let moveCount = 0;

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
  
    if (countHumanCells() >= 2) {
      stopTimer();
      isGameOver = true;
      gameOverModal.style.display = 'block';
    }
}
