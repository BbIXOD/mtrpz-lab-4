import Vector from '../Vector.js';
import { BasicCell } from './BasicCell.js';
import { DummyCell } from './DummyCell.js';
import { Human } from './Human.js';

export class Home extends BasicCell {
  picture = '../pictures/cab';
  private productionRate = 5;
  private tillProduction = 0;
  private humanOffset = new Vector(1, 0);

  action(): void {
    this.tillProduction++;
    if (this.tillProduction === this.productionRate) {
      const humanPosition = this.position.add(this.humanOffset);
      if (!(this.field.getCellV(humanPosition) instanceof DummyCell)) {
        this.tillProduction--;
        return;
      }
      
      this.tillProduction = 0;
      const human = new Human(this.field, humanPosition.x, humanPosition.y);
      human.moveVector = this.humanOffset;
    }
  }
}
