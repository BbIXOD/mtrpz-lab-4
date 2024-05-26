import Field from '../dist/src/Field.js';
import DummyCell from '../dist/src/Cells/DummyCell.js';

const fieldSizeX = 10;
const fieldSizeY = 10;
const field = new Field(fieldSizeX, fieldSizeY);
const fieldContainer = document.getElementById('field-container');
const fieldElement = document.getElementById('field');
const panelElement = document.getElementById('panel');
const scaleDisplay = document.getElementById('scaleDisplay');

let scaleFactor = 1;
const minScaleFactor = 0.05;
const maxScaleFactor = 3;
const scaleStep = 0.01;

let resizeInterval;

for (let x = 0; x < fieldSizeX; x++) {
    for (let y = 0; y < fieldSizeY; y++) {
        field.Cells[x][y] = new DummyCell("../pictures/default_cell.png");
    }
}

function resizeCells() {
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
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;

        const img = cell.querySelector('img');
        if (img) {
            img.style.width = `${cellSize}px`;
            img.style.height = `${cellSize}px`;
        }
    });

    scaleDisplay.textContent = `Scale: ${Math.round(scaleFactor * 100)}%`;
}

while (fieldElement.firstChild) {
    fieldElement.removeChild(fieldElement.firstChild);
}

for (let x = 0; x < fieldSizeX; x++) {
    for (let y = 0; y < fieldSizeY; y++) {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.dataset.x = x;
        cellElement.dataset.y = y;
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

function handleCellClick(event) {
    const x = event.target.closest('.cell').dataset.x;
    const y = event.target.closest('.cell').dataset.y;
    const cell = field.getCell(Number(x), Number(y));

    if (cell) {
        cell.action(x, y);
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

document.getElementById('button1').addEventListener('click', handleButtonClick);

document.getElementById('buttonZoomIn').addEventListener('mousedown', startIncreaseSizeTime);
document.getElementById('buttonZoomIn').addEventListener('mouseup', stopResize);
document.getElementById('buttonZoomIn').addEventListener('mouseleave', stopResize);

document.getElementById('buttonZoomOut').addEventListener('mousedown', startDecreaseSizeTime);
document.getElementById('buttonZoomOut').addEventListener('mouseup', stopResize);
document.getElementById('buttonZoomOut').addEventListener('mouseleave', stopResize);

document.getElementById('buttonToActualSize').addEventListener('click', makeActualSize);

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
