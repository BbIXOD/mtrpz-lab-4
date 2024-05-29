import Field from '../Field.js';
import { Cell } from './Cell.js';
import { DummyCell } from './DummyCell.js';

export class HomeCell implements Cell {
  picture = '../pictures/human.png';
  field: Field<Cell>;
  vector: { x: number; y: number } = { x: 1, y: 0 };
  hunger = 0;

  constructor(field: Field<Cell>) {
    this.field = field;
  }

  action(x: number, y: number): void {
    const newPos = { x: x + this.vector.x, y: y + this.vector.y };
    const cell = this.field.getCell(newPos.x, newPos.y);
    const type = cell.constructor;

    switch (type) {
      case DummyCell: {
        this.field.setCell(newPos.x, newPos.y, new HomeCell(this.field));
        break;
      }
      default: {
        console.log('Unknown cell type: ', type);
        break;
      }
    }
  }
}
