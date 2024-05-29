import Field from '../Field.js';
import { Cell } from './Cell.js';

export class DummyCell implements Cell {
  picture: string;
  field: Field<Cell>;
  position: { x: number; y: number; };

  images: string[] = [
    '../pictures/arrow_up.png',
    '../pictures/arrow_right.png',
    '../pictures/arrow_down.png',
    '../pictures/arrow_left.png',
    '../pictures/default_cell.png',
  ];

  currentIndex = 0;

  constructor(field: Field<Cell>, x = 0, y = 0, picture = '../pictures/default_cell.png') {
    this.picture = picture;
    this.field = field;
    this.position = { x, y };
    field.setCell(x, y, this);
  }

  action(): void { }
}
