import { Direction, getVector } from '../Direction.js';
import Field from '../Field.js';
import Vector from '../Vector.js';
import { BasicCell } from './BasicCell.js';
import { Cell } from './Cell.js';

export class ArrowCell extends BasicCell {
  readonly picture: string;
  readonly moveVector: Vector;
  readonly arrowDirection: Direction;

  constructor(field: Field<Cell>, x: number, y: number, type: Direction) {
    super(field, x, y);
    this.picture = this.getPicture(type);
    this.moveVector = getVector(type);
    this.arrowDirection = type;
  }

  getPicture(dir: Direction) {
    switch (dir) {
      case Direction.UP:
        return '../pictures/arrow_up.png';
      case Direction.RIGHT:
        return '../pictures/arrow_right.png';
      case Direction.DOWN:
        return '../pictures/arrow_down.png';
      case Direction.LEFT:
        return '../pictures/arrow_left.png';
      default:
        throw new Error('Unknown direction');
    }
  }
}
