import { CellFactory, CellType } from '../CellFactory.js';
import Field from '../Field.js';
import { ArrowCell } from './ArrowCell.js';
import { Cell } from './Cell.js';
import { DummyCell } from './DummyCell.js';
import { MovingCell } from './MovingCell.js';

export class Human extends MovingCell {
  picture = '../pictures/human.png';
  hunger = 0;
  private maxHunger = 20;
  evoStage = 0;

  stagePictures = [
    '../pictures/human.png',
    '../pictures/human-stick.png',
    '../pictures/human-axe.png',
    '../pictures/human-pickaxe.png',
  ];

  constructor(field: Field<Cell>, x: number, y: number) {
    super(field, x, y);

    this.actions.set('ArrowCell', this.walkOnArrow.bind(this));
    this.actions.set('Home', this.retreat.bind(this));
    this.actions.set('Human', this.retreat.bind(this));

    this.actions.set('Tree', this.evolve.bind(this));
    this.actions.set('Stone', this.retreat.bind(this));
    this.actions.set('Iron', this.retreat.bind(this));

    this.actions.set('Deer', this.resetHunger.bind(this));
    this.actions.set('Wolf', this.retreat.bind(this));
    this.actions.set('Bear', this.retreat.bind(this));

    this.actions.set('Water', this.dye.bind(this));
  }

  action(): void {
    this.hunger++;
    if (this.hunger >= this.maxHunger) {
      this.dye();
      return;
    }
    super.action();
  }

  private resetHunger() {
    this.hunger = 0;
    this.walkOnTile();
  }

  private evolve() {
    this.evoStage++;
    this.picture = this.stagePictures[this.evoStage];

    switch (this.evoStage) {
      case 1:
        this.actions.set('Tree', this.walkOnTile.bind(this));
        this.actions.set('Stone', this.evolve.bind(this));
        this.actions.set('Wolf', this.resetHunger.bind(this));
        break;
      case 2:
        this.actions.set('Stone', this.walkOnTile.bind(this));
        this.actions.set('Iron', this.evolve.bind(this));
        this.actions.set('Bear', this.resetHunger.bind(this));
        break;
      case 3:
        this.actions.set('Iron', this.walkOnTile.bind(this));
        this.maxHunger = 30; // TODO: think about other buff
        break;
    }

    this.walkOnTile();
  }

  private walkOnArrow(arrow: Cell) {
    this.walkOnTile();
    const arrowCell = arrow as ArrowCell;
    this.moveVector = arrowCell.moveVector.copy();
  }

  private dye() {
    CellFactory.createCellV(
      CellType.DummyCell,
      this.field,
      this.position.copy(),
    );
  }

  private retreat() {
    this.moveVector = this.moveVector.invert();
    const opposingCell = this.field.getCellV(
      this.position.add(this.moveVector),
    );
    const cellName = opposingCell?.constructor.name;
    if (this.actions.get(cellName)?.name === 'bound ' + this.retreat.name) {
      return;
    }
    super.action();
  }

  private walkOnTile() {
    CellFactory.createCellV(
      CellType.DummyCell,
      this.field,
      this.position.copy(),
    );
    this.position = this.position.add(this.moveVector);
    this.field.setCellV(this.position, this);
  }

  protected onUnknownCell(): void {
    this.walkOnTile();
  }
}
