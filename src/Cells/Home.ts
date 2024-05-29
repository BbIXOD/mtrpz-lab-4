import Field from '../Field.js';
import { Cell } from './Cell.js';

export class HomeCell implements Cell {
  picture = '../pictures/cab';
  field: Field<Cell>;
  private productionRate = 5;
  private tillProduction = 0;

  constructor(field: Field<Cell>) {
    this.field = field;
  }

  action(x: number, y: number): void {
    this.tillProduction++;
    if (this.tillProduction === this.productionRate) {
      this.tillProduction = 0;
    }
  }
}
