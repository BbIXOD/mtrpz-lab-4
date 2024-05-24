import Field from './src/Field.js';
import DummyCell from './src/Cells/DummyCell.js';

// Створення екземпляру поля
const field = new Field(10, 10);

// Додавання прикладу клітинки на поле (в даному випадку - з DummyCell)
field.Cells[5][5] = new DummyCell();

// Функція, яка буде викликатися при натисканні на кнопки
function handleButtonClick(event) {
    alert('Welcome!');
}

// Додавання обробників подій для кожної кнопки
document.getElementById('button1').addEventListener('click', handleButtonClick);
document.getElementById('button2').addEventListener('click', handleButtonClick);
document.getElementById('button3').addEventListener('click', handleButtonClick);

