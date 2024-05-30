import Field from '../Field.js';
import { ArrowCell } from './ArrowCell.js';
import { Cell } from './Cell.js';
import { DummyCell } from './DummyCell.js';
import { MovingCell } from './MovingCell.js';

export class Human extends MovingCell {
  picture = '../pictures/human.png';
  hunger = 0;
  private maxHunger = 20;

  constructor(field: Field<Cell>, x: number, y: number) {
    super(field, x, y);

    this.actions.set('ArrowCell', this.walkOnArrow.bind(this));
    this.actions.set('Home', this.retreat.bind(this));
    this.actions.set('Human', this.retreat.bind(this));
  }

  action(): void {
    this.hunger++;
    if (this.hunger > this.maxHunger) {
      new DummyCell(this.field, this.position.x, this.position.y);
      return;
    }
    super.action();
  }

  private walkOnArrow(arrow: Cell) {
    this.walkOnTile();
    const arrowCell = arrow as ArrowCell;
    this.moveVector = arrowCell.moveVector;
  }

  private retreat() {
    this.moveVector = this.moveVector.invert();
    this.walkOnTile();
  }

  private walkOnTile() {
    new DummyCell(this.field, this.position.x, this.position.y);
    this.position = this.position.add(this.moveVector);
    this.field.setCellV(this.position, this);
  }

  protected onUnknownCell(): void {
    this.walkOnTile();
  }
}
