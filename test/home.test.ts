import Field from '../src/Field.js';
import { Cell, DummyCell, Home, Human } from '../src/Cells/Cells.js';
import Vector from '../src/Vector.js';
import { expect } from 'chai';

describe('Hut', () => {
  it ('should spawn human', function () {
      const field = new Field<Cell>(10, 10);
      const hut = new Home(field, 0, 0);
      new DummyCell(field, 1, 0);

      for (let i = 0; i < 5; i++) {
        hut.action();
      }

      expect(field.getCell(1, 0)).to.be.instanceOf(Human);
  })
});