import Field from './src/Field.js';
import DummyCell from './src/Cells/DummyCell.js';

const fieldSizeX = 10;
const fieldSizeY = 10;
const field = new Field(fieldSizeX, fieldSizeY);

for (let x = 0; x < fieldSizeX; x++) {
    for (let y = 0; y < fieldSizeY; y++) {
        field.Cells[x][y] = new DummyCell();
    }
}

const fieldContainer = document.getElementById('field-container');
const fieldElement = document.getElementById('field');
const panelElement = document.getElementById('panel');

function resizeCells() {
    const containerWidth = fieldContainer.clientWidth;
    const containerHeight = window.innerHeight - panelElement.offsetHeight;
    const cellWidth = containerWidth / fieldSizeX;
    const cellHeight = containerHeight / fieldSizeY;
    const cellSize = Math.min(cellWidth, cellHeight);

    fieldElement.style.width = `${cellSize * fieldSizeX}px`;
    fieldElement.style.height = `${cellSize * fieldSizeY}px`;
    fieldElement.style.gridTemplateColumns = `repeat(${fieldSizeX}, ${cellSize}px)`;
    fieldElement.style.gridTemplateRows = `repeat(${fieldSizeY}, ${cellSize}px)`;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
    });
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
    alert('Welcome!');
}

document.getElementById('button1').addEventListener('click', handleButtonClick);
document.getElementById('button2').addEventListener('click', handleButtonClick);
document.getElementById('button3').addEventListener('click', handleButtonClick);

window.addEventListener('load', resizeCells);
window.addEventListener('resize', resizeCells);

resizeCells();
