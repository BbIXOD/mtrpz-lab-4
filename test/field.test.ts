import Field from '../src/Field.js';
import { Cell, DummyCell } from '../src/Cells/Cells.js';
import { expect } from 'chai';

describe('Field', () => {
  it('should save cell', function () {
    const field = new Field<Cell>(10, 10);
    const cell = new DummyCell(field);
    field.setCell(0, 0, cell);
    expect(field.getCell(0, 0)).to.equal(cell);
  });

  it('should work with out of bounds', function () {
    const field = new Field<Cell>(10, 10);
    const cell = new DummyCell(field);
    field.setCell(1, 2, cell);
    expect(field.getCell(11, 12)).to.equal(cell);
  });
});
