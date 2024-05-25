import Field from './src/Field.js';
import DummyCell from './src/Cells/DummyCell.js';

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
        field.Cells[x][y] = new DummyCell();
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
        fieldElement.appendChild(cellElement);
    }
}

function handleCellClick(event) {
    const x = event.target.dataset.x;
    const y = event.target.dataset.y;
    const cell = field.getCell(Number(x), Number(y));

    if (cell) {
        cell.action(x, y);
    }
}

function handleButtonClick(event) {
    if (event.target.id === 'buttonResetSize') {
        scaleFactor = 1;
        resizeCells();
    } else {
        alert('Welcome!');
    }
}

function increaseSize() {
    scaleFactor = Math.min(maxScaleFactor, scaleFactor + scaleStep);
    resizeCells();
}

function decreaseSize() {
    scaleFactor = Math.max(minScaleFactor, scaleFactor - scaleStep);
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

document.getElementById('buttonIncreaseSize').addEventListener('mousedown', startIncreaseSizeTime);
document.getElementById('buttonIncreaseSize').addEventListener('mouseup', stopResize);
document.getElementById('buttonIncreaseSize').addEventListener('mouseleave', stopResize);

document.getElementById('buttonDecreaseSize').addEventListener('mousedown', startDecreaseSizeTime);
document.getElementById('buttonDecreaseSize').addEventListener('mouseup', stopResize);
document.getElementById('buttonDecreaseSize').addEventListener('mouseleave', stopResize);

document.getElementById('buttonResetSize').addEventListener('click', handleButtonClick);

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
