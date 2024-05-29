import { BasicCell } from './BasicCell.js';

export class Home extends BasicCell {
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
