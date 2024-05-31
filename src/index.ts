import Field from './Field.js';
import { Cell, DummyCell, ArrowCell, Home, Human, Deer, Tree, Wolf, Stone, Bear, Iron } from './Cells/Cells.js';
import { Direction } from './Direction.js';

let fieldSizeX = 10;
let fieldSizeY = fieldSizeX;
let field = new Field<Cell>(fieldSizeX, fieldSizeY);
const fieldContainer = document.getElementById('field-container');
const fieldElement = document.getElementById('field');
const panelElement = document.getElementById('panel');
const scaleDisplay = document.getElementById('scaleDisplay');
const moveDisplay = document.getElementById('moveDisplay');
const humanCountDisplay = document.getElementById('humanCountDisplay');
const humanHungerDisplay = document.getElementById('humanHungerDisplay');
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

let cellsArray: HTMLElement[] = [];

const cellClasses = [
  { class: DummyCell, chance: 76 },
  { class: Deer, chance: 7 },
  { class: Tree, chance: 5 },
  { class: Wolf, chance: 5 },
  { class: Stone, chance: 3 },
  { class: Bear, chance: 3 },
  { class: Iron, chance: 1 }
];

const totalChance = cellClasses.reduce((sum, cell) => sum + cell.chance, 0);

function getRandomCellClass() {
  let random = Math.random() * totalChance;
  for (let i = 0; i < cellClasses.length; i++) {
    if (random < cellClasses[i].chance) {
      return cellClasses[i].class;
    }
    random -= cellClasses[i].chance;
  }
  return DummyCell;
}

function initializeField() {
  for (let x = 0; x < fieldSizeX; x++) {
    for (let y = 0; y < fieldSizeY; y++) {
      const CellClass = getRandomCellClass();
      new CellClass(field, x, y);
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

  cellsArray.forEach((element) => {
    element.style.width = `${cellSize}px`;
    element.style.height = `${cellSize}px`;

    const img = element.querySelector('img');
    if (img) {
      img.style.width = `${cellSize}px`;
      img.style.height = `${cellSize}px`;
    }
  });

  scaleDisplay!.textContent = `Scale: ${Math.round(scaleFactor * 100)}%`;
}

function createField() {
  cellsArray = [];

  while (fieldElement!.firstChild) {
    fieldElement!.removeChild(fieldElement!.firstChild);
  }

  for (let y = 0; y < fieldSizeY; y++) {
    for (let x = 0; x < fieldSizeX; x++) {
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

      cellsArray.push(cellElement);

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
    cycleCellState(cell);
    updateFieldImages();
  }
}

function cycleCellState(cell: Cell) {
  makeHumanIformationDissapiar();
  if (cell instanceof DummyCell) {
    if (!homeCellExists()) {
      new Home(field, cell.position.x, cell.position.y);
    } else {
      new ArrowCell(field, cell.position.x, cell.position.y, Direction.UP);
    }
  }

  if (cell instanceof ArrowCell) {
    if (cell.arrowDirection === Direction.UP) {
      new ArrowCell(field, cell.position.x, cell.position.y, Direction.RIGHT);
    } else if (cell.arrowDirection === Direction.RIGHT) {
      new ArrowCell(field, cell.position.x, cell.position.y, Direction.DOWN);
    } else if (cell.arrowDirection === Direction.DOWN) {
      new ArrowCell(field, cell.position.x, cell.position.y, Direction.LEFT);
    } else if (cell.arrowDirection === Direction.LEFT) {
      new DummyCell(field, cell.position.x, cell.position.y);
    }
  }

  if (cell instanceof Human) {
    humanHungerDisplay!.textContent = `Hunger: ${cell.hunger}`;
    humanHungerDisplay!.style.display = 'block';
  }
}

function homeCellExists(): boolean {
  for (let y = 0; y < fieldSizeY; y++) {
    for (let x = 0; x < fieldSizeX; x++) {
      const cell = field.getCell(x, y);
      if (cell instanceof Home) {
        return true;
      }
    }
  }
  return false;
}

function makeHumanIformationDissapiar() {
  humanHungerDisplay!.textContent = `Hunger: :)`;
  humanHungerDisplay!.style.display = 'none';
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

function performActions() {
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
    }
  }
  updateFieldImages();
}

function updateFieldImages() {
  cellsArray.forEach((element) => {
    const x = parseInt(element.dataset.x || '0');
    const y = parseInt(element.dataset.y || '0');
    const fieldCell = field.getCell(x, y);

    if (fieldCell.picture) {
      let img = element.querySelector('img');
      if (!img) {
        img = document.createElement('img');
        element.appendChild(img);
      }
      img.src = fieldCell.picture;
    }
  });
}

function makeNextMove() {
  performActions();
  const humanCount = countHumanCells();
  humanCountDisplay!.textContent = `Humans alive: ${humanCount}`;
  moveCount = moveCount + 1;
  moveDisplay!.textContent = `Move: ${Math.round(moveCount)}`;
  makeHumanIformationDissapiar();
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
  makeHumanIformationDissapiar();
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
    makeActualSize();
    moveCount = 0;
    moveDisplay!.textContent = `Move: 0`;
    const humanCount = countHumanCells();
    humanCountDisplay!.textContent = `Humans alive: ${humanCount}`;
    makeHumanIformationDissapiar();
    sizeModal.style.display = 'none';
    errorText.style.display = 'none';
  } else {
    errorText.textContent = 'Please enter a number between 10 and 100.';
    errorText.style.display = 'block';
  }
}

function handleCloseModal() {
  sizeModal.style.display = 'none';
  makeHumanIformationDissapiar();
}

function handleRandomizeField() {
  const newSize = Math.floor(Math.random() * (100 - 10 + 1)) + 10;
  fieldSizeX = newSize;
  fieldSizeY = newSize;
  field = new Field<Cell>(fieldSizeX, fieldSizeY);
  initializeField();
  createField();
  resizeCells();
  makeActualSize();
  moveCount = 0;
  moveDisplay!.textContent = `Move: 0`;
  const humanCount = countHumanCells();
  humanCountDisplay!.textContent = `Humans alive: ${humanCount}`;
  makeHumanIformationDissapiar();
}

function handleResetField() {
  initializeField();
  createField();
  resizeCells();
  makeActualSize();
  moveCount = 0;
  moveDisplay!.textContent = `Move: 0`;
  const humanCount = countHumanCells();
  humanCountDisplay!.textContent = `Humans alive: ${humanCount}`;
  makeHumanIformationDissapiar();
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
