import Field from '../src/Field.js';
import { Cell, DummyCell, Home, Human } from '../src/Cells/Cells.js';
import Vector from '../src/Vector.js';
import { expect } from 'chai';
import { CellFactory, CellType } from '../src/CellFactory.js';

describe('Hut', () => {
  it('should spawn human', function () {
    const field = new Field<Cell>(10, 10);
    const hut = CellFactory.createCellV(CellType.Home, field, new Vector(0, 0));
    CellFactory.createCellV(CellType.DummyCell, field, new Vector(0, 1));
    hut.action();

    expect(field.getCell(0, 1)).to.be.instanceOf(Human);
  });

  it('should not spawn while human is on tile', function () {
    const field = new Field<Cell>(10, 10);
    const hut = CellFactory.createCellV(CellType.Home, field, new Vector(0, 0));
    const human = CellFactory.createCellV(
      CellType.Human,
      field,
      new Vector(0, 1),
    ) as Human;
    human.moveVector = new Vector(0, 1);
    hut.action();

    human.action();

    expect(field.getCell(0, 1)).to.be.instanceOf(DummyCell);
  });
});
