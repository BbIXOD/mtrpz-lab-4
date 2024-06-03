import {
  modalOkButton,
  closeButton,
  startStopMoveButton,
} from './window-data.js';

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
} from './WindowInteractions/makeMove.js';

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
