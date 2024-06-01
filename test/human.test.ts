import Field from '../src/Field.js';
import { Cell, Deer, DummyCell, Human, Stone, Tree, Water, ArrowCell } from '../src/Cells/Cells.js';
import Vector from '../src/Vector.js';
import { expect } from 'chai';
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
    human.hunger = Object.getOwnPropertyDescriptor(human, 'maxHunger')!.value;
    human.action();
    expect(field.getCell(0, 0)).to.be.instanceOf(DummyCell);
  });

  it('should be able to evolve', function () {
    const field = new Field<Cell>(10, 10);
    const human = new Human(field, 0, 0);
    human.moveVector = new Vector(0, 1);
    new Tree(field, 0, 1);
    human.action();
    expect(human.evoStage).to.equal(1);
  });

  it('should be able to retreat', function () {
    const field = new Field<Cell>(10, 10);
    const human = new Human(field, 0, 1);
    human.moveVector = new Vector(0, 1);
    new Stone(field, 0, 2);
    human.action();
    expect(human.moveVector).to.deep.equal(new Vector(-0, -1));
  });

  it('should be able to reset hunger', function () {
    const field = new Field<Cell>(10, 10);
    const human = new Human(field, 0, 1);
    human.moveVector = new Vector(0, 1);
    new Deer(field, 0, 2);
    human.action();
    expect(human.hunger).to.equal(0);
  });

  it('should be able to dye', function () {
    const field = new Field<Cell>(10, 10);
    const human = new Human(field, 0, 1);
    human.moveVector = new Vector(0, 1);
    new Water(field, 0, 2);
    human.action();
    expect(field.getCell(0, 1)).to.be.instanceOf(DummyCell);
  });
});
