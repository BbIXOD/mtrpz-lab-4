import Field from '../Field.js';
import { BasicCell } from './BasicCell.js';
import { Cell } from './Cell.js';

export class DummyCell extends BasicCell {
  picture: string;

  currentIndex = 0;

  constructor(field: Field<Cell>, x = 0, y = 0, picture = '../pictures/default_cell.png') {
    super(field, x, y);
    this.picture = picture;
  }

  action(): void { }
}
