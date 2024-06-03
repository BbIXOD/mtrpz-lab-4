import Field from '../Field.js';
import { Cell } from '../Cells/Cells.js';
import { CellFactory, CellType } from '../CellFactory.js';

export let fieldSizeX = 15;
export let fieldSizeY = fieldSizeX;

export let field = new Field<Cell>(fieldSizeX, fieldSizeY);

export let scaleFactor = 1;

const cellClasses = [
  { class: CellType.DummyCell, chance: 90 },
  { class: CellType.Water, chance: 8 },
  { class: CellType.Deer, chance: 7 },
  { class: CellType.Tree, chance: 5 },
  { class: CellType.Wolf, chance: 5 },
  { class: CellType.Stone, chance: 3 },
  { class: CellType.Bear, chance: 3 },
  { class: CellType.Iron, chance: 1 },
];

const totalChance = cellClasses.reduce((sum, cell) => sum + cell.chance, 0);

export function setFieldSize (newSize: number) {
    fieldSizeX = newSize;
    fieldSizeY = newSize;
}

export function setNewField (fieldX: number, fieldY: number) {
    field = new Field<Cell>(fieldX, fieldY);
}

export function setScaleFactor (factor: number) {
    scaleFactor = factor;
}

export function getRandomCellClass() {
  let random = Math.random() * totalChance;
  for (let i = 0; i < cellClasses.length; i++) {
    if (random < cellClasses[i].chance) {
      return cellClasses[i].class;
    }
    random -= cellClasses[i].chance;
  }
  return CellType.DummyCell;
}

export function initializeField() {
  for (let x = 0; x < fieldSizeX; x++) {
    for (let y = 0; y < fieldSizeY; y++) {
      const CellClass = getRandomCellClass();
      CellFactory.createCell(CellClass, field, x, y);
    }
  }
}
