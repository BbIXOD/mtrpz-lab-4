import Field from '../Field.js';
import { Cell } from './Cell.js';
import { DummyCell } from './DummyCell.js';
import { MovingCell } from './MovingCell.js';

export class Human extends MovingCell {
  picture = '../pictures/human.png';
  hunger = 0;

  constructor(field: Field<Cell>, x: number, y: number) {
    super(field, x, y);
  }

  action(): void {
      this.hunger++;
      if (this.hunger > 10) {
          this.field.setCellV(this.position, new DummyCell(this.field));
          return;
      }
      super.action();
  }

  private walkOnTile() {
    this.field.setCellV(this.position, new DummyCell(this.field));
    this.position = this.position.add(this.moveVector);
    this.field.setCellV(this.position, this);
  }

  protected onUnknownCell(): void {
      this.walkOnTile();
  }
}
