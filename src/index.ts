import Field from './Field.js';
import { Cell, DummyCell } from './Cells/Cells.js';

let fieldSizeX = 10;
let fieldSizeY = fieldSizeX;
let field = new Field<Cell>(fieldSizeX, fieldSizeY);
const fieldContainer = document.getElementById('field-container');
const fieldElement = document.getElementById('field');
const panelElement = document.getElementById('panel');
const scaleDisplay = document.getElementById('scaleDisplay');
const moveDisplay = document.getElementById('moveDisplay');
const fieldSizeInput = document.getElementById(
  'fieldSizeInput',
) as HTMLInputElement;
const sizeModal = document.getElementById('sizeModal') as HTMLElement;
const modalOkButton = document.getElementById('modalOkButton') as HTMLElement;
const closeButton = document.querySelector('.close') as HTMLElement;

if (
  !fieldContainer ||
  !fieldElement ||
  !panelElement ||
  !scaleDisplay ||
  !moveDisplay ||
  !fieldSizeInput ||
  !sizeModal ||
  !modalOkButton ||
  !closeButton
) {
  throw new Error('Failed to get elements');
}

let scaleFactor = 1;
const minScaleFactor = 0.05;
const maxScaleFactor = 3;
const scaleStep = 0.01;

let moveCount = 0;

let resizeInterval: NodeJS.Timeout;

function initializeField() {
  for (let x = 0; x < fieldSizeX; x++) {
    for (let y = 0; y < fieldSizeY; y++) {
      field.Cells[x][y] = new DummyCell('../pictures/default_cell.png', field);
    }
  }
}

function resizeCells() {
  if (!fieldContainer || !fieldElement || !panelElement) return;
  const containerWidth = fieldContainer.clientWidth;
  const containerHeight = window.innerHeight - panelElement.offsetHeight;

  const baseCellWidth = containerWidth / fieldSizeX;
  const baseCellHeight = containerHeight / fieldSizeY;
  const baseCellSize = Math.min(baseCellWidth, baseCellHeight);

  const cellSize = baseCellSize * scaleFactor;

  fieldElement.style.width = `${baseCellSize * fieldSizeX}px`;
  fieldElement.style.height = `${baseCellSize * fieldSizeY}px`;

  fieldElement.style.gridTemplateColumns = `repeat(${fieldSizeX}, ${cellSize}px)`;
  fieldElement.style.gridTemplateRows = `repeat(${fieldSizeY}, ${cellSize}px)`;

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    const element = cell as HTMLElement;
    element.style.width = `${cellSize}px`;
    element.style.height = `${cellSize}px`;

    const img = cell.querySelector('img');
    if (img) {
      img.style.width = `${cellSize}px`;
      img.style.height = `${cellSize}px`;
    }
  });

  scaleDisplay!.textContent = `Scale: ${Math.round(scaleFactor * 100)}%`;
}

function createField() {
  while (fieldElement!.firstChild) {
    fieldElement!.removeChild(fieldElement!.firstChild);
  }

  for (let x = 0; x < fieldSizeX; x++) {
    for (let y = 0; y < fieldSizeY; y++) {
      const cellElement = document.createElement('div');
      cellElement.className = 'cell';
      cellElement.dataset.x = x.toString();
      cellElement.dataset.y = y.toString();
      cellElement.addEventListener('click', handleCellClick);

      const cell = field.getCell(x, y);
      if (cell.picture) {
        const img = document.createElement('img');
        img.src = cell.picture;
        img.alt = `Cell at (${x}, ${y})`;
        cellElement.appendChild(img);
      }

      fieldElement!.appendChild(cellElement);
    }
  }
}

function handleCellClick(event: MouseEvent) {
  if (!event.target) return;
  const target = event.target as HTMLElement;
  const closestCell = target.closest('.cell') as HTMLElement;
  if (!closestCell) return;

  const x = closestCell.dataset.x;
  const y = closestCell.dataset.y;
  const cell = field.getCell(Number(x), Number(y));

  if (cell) {
    cell.action(Number(x), Number(y));
  }
}

function makeNextMove() {
  alert("You made the next move!\nThat's it for now");
  moveCount = ++moveCount;
  moveDisplay!.textContent = `Move: ${Math.round(moveCount)}`;
}

function increaseSize() {
  scaleFactor = Math.min(maxScaleFactor, scaleFactor + scaleStep);
  resizeCells();
}

function decreaseSize() {
  scaleFactor = Math.max(minScaleFactor, scaleFactor - scaleStep);
  resizeCells();
}

function makeActualSize() {
  scaleFactor = 1;
  resizeCells();
}

function startIncreaseSizeTime() {
  increaseSize();
  resizeInterval = setInterval(increaseSize, 100);
}

function startDecreaseSizeTime() {
  decreaseSize();
  resizeInterval = setInterval(decreaseSize, 100);
}

function stopResize() {
  clearInterval(resizeInterval);
}

function handleButtonClick() {
  alert('Welcome!');
}

function handleCreateField() {
  sizeModal.style.display = 'block';
}

function handleModalOk() {
  const newSize = parseInt(fieldSizeInput.value);
  const errorText = document.getElementById(
    'errorText',
  ) as HTMLParagraphElement;

  if (newSize >= 10 && newSize <= 100) {
    fieldSizeX = newSize;
    fieldSizeY = newSize;
    field = new Field<Cell>(fieldSizeX, fieldSizeY);
    initializeField();
    createField();
    resizeCells();
    sizeModal.style.display = 'none';
    errorText.style.display = 'none';
  } else {
    errorText.textContent = 'Please enter a number between 10 and 100.';
    errorText.style.display = 'block';
  }
}

function handleCloseModal() {
  sizeModal.style.display = 'none';
}

function handleRandomizeField() {
  const newSize = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
  fieldSizeX = newSize;
  fieldSizeY = newSize;
  field = new Field<Cell>(fieldSizeX, fieldSizeY);
  initializeField();
  createField();
  resizeCells();
}

function handleResetField() {
  initializeField();
  createField();
  resizeCells();
}

document
  .getElementById('buttonCreateField')!
  .addEventListener('click', handleCreateField);
modalOkButton.addEventListener('click', handleModalOk);
closeButton.addEventListener('click', handleCloseModal);

document
  .getElementById('buttonNextMove')!
  .addEventListener('click', makeNextMove);

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
