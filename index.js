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

const fieldElement = document.getElementById('field');
fieldElement.style.gridTemplateColumns = `repeat(${fieldSizeX}, 1fr)`;

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

