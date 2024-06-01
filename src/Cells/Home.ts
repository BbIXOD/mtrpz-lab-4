import Vector from '../Vector.js';
import { BasicCell } from './BasicCell.js';
import { ArrowCell, DummyCell } from './Cells.js';
import { Human } from './Human.js';

export class Home extends BasicCell {
  picture = '../pictures/cabin.png';
  private productionRate = 5;
  private tillProduction = this.productionRate - 1;
  private humanOffset = new Vector(0, 1);

  action(): void {
    this.tillProduction++;
    if (this.tillProduction === this.productionRate) {
      const humanPosition = this.position.add(this.humanOffset);
      const cell = this.field.getCellV(humanPosition);
      if (!(cell instanceof DummyCell || cell instanceof ArrowCell)) {
        this.tillProduction--;
        return;
      }

      this.tillProduction = 0;
      const human = new Human(this.field, humanPosition.x, humanPosition.y);
      human.moveVector = this.humanOffset.copy();
    }
  }
}
