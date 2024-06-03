import {
  initializeField,
} from './WindowInteractions/initializeField.js';

import {
  resizeCells,
  createField,
  makeHumanIformationDissapiar,
} from './WindowInteractions/initializeCells.js';

import {
  makeActualSize,
  startIncreaseSizeTime,
  startDecreaseSizeTime,
  stopResize,
} from './WindowInteractions/changeFieldSize.js';

import {
  startTimer,
  stopTimer,
  handleTimerMoveSpeed,
} from './WindowInteractions/changeSpeed.js';

import {
  handleModalOk,
  handleCloseModal,
  handleRandomizeField,
  handleResetField,
} from './WindowInteractions/changeCellSizeOnField.js';

import {
  handleCreateField,
  handleCreateFieldGameOver,
  handleRandomizeFieldGameOver,
  handleResetFieldGameOver,
} from './WindowInteractions/gameOverMod.js';

export const fieldContainer = document.getElementById('field-container');
export const fieldElement = document.getElementById('field');
export const panelElement = document.getElementById('panel');
export const scaleDisplay = document.getElementById('scaleDisplay');
export const speedDisplay = document.getElementById('speedDisplay');
export const moveDisplay = document.getElementById('moveDisplay');
export const humanCountDisplay = document.getElementById('humanCountDisplay');
export const humanHungerDisplay = document.getElementById('humanHungerDisplay');
export const humanDirectionDisplay = document.getElementById('humanDirectionDisplay');
export const fieldSizeInput = document.getElementById('fieldSizeInput') as HTMLInputElement;
export const sizeModal = document.getElementById('sizeModal') as HTMLElement;
export const modalOkButton = document.getElementById('modalOkButton') as HTMLElement;
export const closeButton = document.querySelector('.close') as HTMLElement;
export const startStopMoveButton = document.getElementById('buttonStartStopMove') as HTMLElement;
export const gameOverModal = document.getElementById('gameOverModal') as HTMLElement;

if (
  !fieldContainer ||
  !fieldElement ||
  !panelElement ||
  !scaleDisplay ||
  !speedDisplay ||
  !moveDisplay ||
  !fieldSizeInput ||
  !sizeModal ||
  !modalOkButton ||
  !closeButton ||
  !startStopMoveButton
) {
  throw new Error('Failed to get elements');
}

document
  .getElementById('buttonCreateField')!
  .addEventListener('click', handleCreateField);
document.getElementById('closeModal')!.addEventListener('click', function () {
  const errorText = document.getElementById(
    'errorText',
  ) as HTMLParagraphElement;
  errorText.style.display = 'none';
  makeHumanIformationDissapiar();
});
modalOkButton.addEventListener('click', handleModalOk);
closeButton.addEventListener('click', handleCloseModal);

document
  .getElementById('buttonStartStopMove')!
  .addEventListener('click', () => {
    const img = startStopMoveButton.querySelector('img')!;
    if (img.src.includes('start_game.png')) {
      startTimer();
      img.src = './pictures/pause_game.png';
    } else if (img.src.includes('pause_game.png')) {
      stopTimer();
      img.src = './pictures/start_game.png';
    }
  });

document
  .getElementById('buttonZoomIn')!
  .addEventListener('mousedown', startIncreaseSizeTime);
document
  .getElementById('buttonZoomIn')!
  .addEventListener('mouseup', stopResize);
document
  .getElementById('buttonZoomIn')!
  .addEventListener('mouseleave', stopResize);

document
  .getElementById('buttonZoomOut')!
  .addEventListener('mousedown', startDecreaseSizeTime);
document
  .getElementById('buttonZoomOut')!
  .addEventListener('mouseup', stopResize);
document
  .getElementById('buttonZoomOut')!
  .addEventListener('mouseleave', stopResize);

document
  .getElementById('buttonToActualSize')!
  .addEventListener('click', makeActualSize);

document
  .getElementById('buttonRandomizeField')!
  .addEventListener('click', handleRandomizeField);

document
  .getElementById('buttonResetField')!
  .addEventListener('click', handleResetField);

document
  .getElementById('buttonMoveSpeed')!
  .addEventListener('click', handleTimerMoveSpeed);

document
  .getElementById('buttonOverCreateField')!
  .addEventListener('click', handleCreateFieldGameOver);

document
  .getElementById('buttonOverRandomizeField')!
  .addEventListener('click', handleRandomizeFieldGameOver);

document
  .getElementById('buttonOverResetField')!
  .addEventListener('click', handleResetFieldGameOver);

document.addEventListener(
  'wheel',
  function (event) {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  },
  { passive: false },
);

document.addEventListener('keydown', function (event) {
  if (
    event.ctrlKey &&
    (event.key === '+' ||
      event.key === '=' ||
      event.key === '-' ||
      event.key === '0')
  ) {
    event.preventDefault();
  }
});

window.addEventListener('load', () => {
  initializeField();
  createField();
  resizeCells();
});
window.addEventListener('resize', resizeCells);

resizeCells();
