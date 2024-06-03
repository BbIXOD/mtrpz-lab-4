import { Human } from '../Cells/Cells.js';
import { humanCountDisplay, fieldSizeInput, sizeModal, startStopMoveButton, gameOverModal, } from '../window-data.js';
import { makeActualSize, } from './changeFieldSize.js';
import { initializeField, fieldSizeX, fieldSizeY, setFieldSize, field, setNewField, } from './initializeField.js';
import { resizeCells, createField, makeHumanIformationDissapiar, } from './initializeCells.js';
import { changeMoveCount, updateDisplays, isGameOver, changeGameOver, stopTimer, } from './makeMove.js';

function resetTimer() {
    stopTimer();
    changeMoveCount(0);
    updateDisplays();
    const img = startStopMoveButton.querySelector('img')!;
    img.src = './pictures/start_game.png';
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
  
export function handleModalOk() {
    const newSize = parseInt(fieldSizeInput.value);
    const errorText = document.getElementById(
      'errorText',
    ) as HTMLParagraphElement;
  
    if (newSize >= 10 && newSize <= 100) {
      setFieldSize(newSize);
      setNewField(fieldSizeX, fieldSizeY);
      initializeField();
      createField();
      resizeCells();
      makeActualSize();
      resetTimer();
      humanCountDisplay!.textContent = `Humans alive: ${countHumanCells()}`;
      makeHumanIformationDissapiar();
      changeGameOver(false);
      sizeModal.style.display = 'none';
      errorText.style.display = 'none';
    } else {
      errorText.textContent = 'Please enter a number between 10 and 100.';
      errorText.style.display = 'block';
    }
}
  
export function handleCloseModal() {
    sizeModal.style.display = 'none';
    makeHumanIformationDissapiar();
    if (isGameOver === true) {
      gameOverModal!.style.display = 'block';
    }
}
  
export function handleRandomizeField() {
    const newSize = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
    setFieldSize(newSize);
    setNewField(fieldSizeX, fieldSizeY);
    initializeField();
    createField();
    resizeCells();
    makeActualSize();
    resetTimer();
    humanCountDisplay!.textContent = `Humans alive: ${countHumanCells()}`;
    makeHumanIformationDissapiar();
    changeGameOver(false);
}
  
export function handleResetField() {
    initializeField();
    createField();
    resizeCells();
    makeActualSize();
    resetTimer();
    humanCountDisplay!.textContent = `Humans alive: ${countHumanCells()}`;
    makeHumanIformationDissapiar();
    changeGameOver(false);
}
