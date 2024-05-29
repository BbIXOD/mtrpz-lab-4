import Field from '../src/Field.js';
import { Cell, Human } from '../src/Cells/Cells.js';
import Vector from './Vector.js';
import { expect } from 'chai';

describe('Human', () => {
  it ('should walk', function () {
      const field = new Field<Cell>(10, 10);
      const human = new Human(field, 0, 0);
      human.action();
      expect(human.position).to.deep.equal(new Vector(0, 1));
  })
});