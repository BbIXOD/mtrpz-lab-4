import Field from '../src/Field.js';
import { Cell, DummyCell, Human } from '../src/Cells/Cells.js';
import Vector from '../src/Vector.js';
import { expect } from 'chai';
import { ArrowCell } from '../src/Cells/ArrowCell.js';
import { Direction } from '../src/Direction.js';

describe('Human', () => {
  it('should walk', function () {
    const field = new Field<Cell>(10, 10);
    const human = new Human(field, 0, 0);
    human.moveVector = new Vector(0, 1);
    human.action();
    human.action();
    expect(human.position).to.deep.equal(new Vector(0, 2));
  });

  it('should change direction on arrow', function () {
    const field = new Field<Cell>(10, 10);
    const human = new Human(field, 0, 0);
    const arrow = new ArrowCell(field, 0, 1, Direction.RIGHT);
    human.moveVector = new Vector(0, 1);
    human.action();
    human.action();
    expect(human.position).to.deep.equal(new Vector(1, 1));
  });

  it('should starve', function () {
    const field = new Field<Cell>(10, 10);
    const human = new Human(field, 0, 0);
    human.hunger = 10;
    human.action();
    expect(field.getCell(0, 0)).to.be.instanceOf(DummyCell);
  });
});
