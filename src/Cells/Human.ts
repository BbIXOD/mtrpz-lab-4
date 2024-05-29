import Field from '../Field.js';
import { Cell } from './Cell.js';
import { DummyCell } from './DummyCell.js';
import { MovingCell } from './MovingCell.js';

export class HomeCell extends MovingCell {
  picture = '../pictures/human.png';
  hunger = 0;

  constructor(field: Field<Cell>) {
    super(field);
  }

  action(x: number, y: number): void {
      this.hunger++;
      if (this.hunger > 10) {
          this.field.setCell(x, y, new DummyCell(this.field));
      }
      super.action(x, y);
  }

  private walkOnTile(x: number, y: number) {
    this.field.setCell(x, y, new DummyCell(this.field));
    this.field.setCell(x + this.vector.x, y + this.vector.y, this);
  }

  protected onUnknownCell(x: number, y: number): void {
      this.walkOnTile(x, y);
  }
}
