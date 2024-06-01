import Field from '../Field.js';
import Vector from '../Vector.js';
import { Cell } from './Cell.js';

export abstract class BasicCell implements Cell {
  abstract picture: string;
  position: Vector;
  didAction = false;

  constructor(protected readonly field: Field<Cell>, x: number, y: number) {
    this.position = new Vector(x, y);
  }

  action() {
    this.didAction = true;
  }
}
