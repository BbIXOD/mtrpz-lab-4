import { sizeModal, startStopMoveButton, gameOverModal, } from '../index.js';
import { makeHumanIformationDissapiar, } from './initializeCells.js';
import { stopTimer, } from './changeSpeed.js';
import { handleRandomizeField, handleResetField, } from './changeCellSizeOnField.js';

export function handleCreateField() {
    stopTimer();
    startStopMoveButton.querySelector('img')!.src = './pictures/start_game.png';
    sizeModal.style.display = 'block';
    makeHumanIformationDissapiar();
}
  
function closeGameOverModal() {
    gameOverModal.style.display = 'none';
}
  
export function handleCreateFieldGameOver() {
    handleCreateField();
    closeGameOverModal();
}
  
export function handleRandomizeFieldGameOver() {
    handleRandomizeField();
    closeGameOverModal();
}
  
export function handleResetFieldGameOver() {
    handleResetField();
    closeGameOverModal();
}
