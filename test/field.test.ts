import Field from '../src/Field.js';
import { DummyCell } from '../src/Cells/Cells.js';
import { expect } from 'chai';

describe('Field', function () {
  it('should create field', function () {
    const field = new Field(10, 10);
    expect(field.sizeX).to.equal(10);
    expect(field.sizeY).to.equal(10);
  });

  it('should save cell', function () {
    const field = new Field(10, 10);
    const cell = new DummyCell();
    field.Cells[0][0] = cell;
    expect(field.getCell(0, 0)).to.equal(cell);
  });

  it('should work with out of bounds', function () {
    const field = new Field(10, 10);
    const cell = new DummyCell();
    field.Cells[1][2] = cell;
    expect(field.getCell(11, 12)).to.equal(cell);
  });
});
