import Field from './Field.js';
import { Cell, DummyCell } from './Cells/Cells.js';

const fieldSizeX = 10;
const fieldSizeY = 10;
const field = new Field<Cell>(fieldSizeX, fieldSizeY);
const fieldContainer = document.getElementById('field-container');
const fieldElement = document.getElementById('field');
const panelElement = document.getElementById('panel');
const scaleDisplay = document.getElementById('scaleDisplay');

if (!fieldContainer || !fieldElement || !panelElement || !scaleDisplay) {
    throw new Error('Failed to get elements');
}

let scaleFactor = 1;
const minScaleFactor = 0.05;
const maxScaleFactor = 3;
const scaleStep = 0.01;

let resizeInterval: NodeJS.Timeout;

for (let x = 0; x < fieldSizeX; x++) {
    for (let y = 0; y < fieldSizeY; y++) {
        field.Cells[x][y] = new DummyCell("../pictures/default_cell.png");
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
    cells.forEach(cell => {
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

while (fieldElement.firstChild) {
    fieldElement.removeChild(fieldElement.firstChild);
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

        fieldElement.appendChild(cellElement);
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

function handleButtonClick() {
    alert('Welcome!');
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

document.getElementById('button1')!.addEventListener('click', handleButtonClick);

document.getElementById('buttonZoomIn')!.addEventListener('mousedown', startIncreaseSizeTime);
document.getElementById('buttonZoomIn')!.addEventListener('mouseup', stopResize);
document.getElementById('buttonZoomIn')!.addEventListener('mouseleave', stopResize);

document.getElementById('buttonZoomOut')!.addEventListener('mousedown', startDecreaseSizeTime);
document.getElementById('buttonZoomOut')!.addEventListener('mouseup', stopResize);
document.getElementById('buttonZoomOut')!.addEventListener('mouseleave', stopResize);

document.getElementById('buttonToActualSize')!.addEventListener('click', makeActualSize);

document.addEventListener('wheel', function(event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && (event.key === '+' || event.key === '=' || event.key === '-' || event.key === '0')) {
        event.preventDefault();
    }
});

window.addEventListener('load', resizeCells);
window.addEventListener('resize', resizeCells);

resizeCells();