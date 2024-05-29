import Field from '../Field.js';
import Vector from '../Vector.js';
import { BasicCell } from './BasicCell.js';
import { Cell } from './Cell.js';

export class HomeCell extends BasicCell {
  picture = '../pictures/cab';
  private productionRate = 5;
  private tillProduction = 0;

  action(): void {
    this.tillProduction++;
    if (this.tillProduction === this.productionRate) {
      this.tillProduction = 0;
    }
  }
}
