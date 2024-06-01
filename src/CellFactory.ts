import {
  ArrowCell,
  Bear,
  Cell,
  Deer,
  DummyCell,
  Home,
  Human,
  Iron,
  Stone,
  Tree,
  Water,
  Wolf,
} from './Cells/Cells.js';
import Field from './Field';
import Vector from './Vector.js';
import { getDirection, Direction } from './Direction.js';

export enum CellType {
  Home = 'Home',
  Human = 'Human',
  Tree = 'Tree',
  Stone = 'Stone',
  Iron = 'Iron',
  Wolf = 'Wolf',
  Bear = 'Bear',
  Deer = 'Deer',
  Water = 'Water',
  DummyCell = 'DummyCell',
  ArrowCell = 'ArrowCell',
}

export class CellFactory {
  static createCellV(
    cellType: CellType,
    field: Field<Cell>,
    vector: Vector,
  ): Cell {
    return CellFactory.createCell(cellType, field, vector.x, vector.y);
  }

  static createCell(
    cellType: CellType,
    field: Field<Cell>,
    x: number,
    y: number,
  ): Cell {
    const CellClass = CellFactory.switch(cellType);
    const cell = new CellClass(field, x, y);
    field.setCell(x, y, cell);
    return cell;
  }

  static createArrowCell(
    field: Field<Cell>,
    x: number,
    y: number,
    moveVector: Vector | Direction,
  ): ArrowCell {
    const direction =
      typeof moveVector === 'number' ? moveVector : getDirection(moveVector);
    const cell = new ArrowCell(field, x, y, direction);
    field.setCell(x, y, cell);
    return cell;
  }

  private static switch(cellType: CellType) {
    switch (cellType) {
      case CellType.Home:
        return Home;
      case CellType.Human:
        return Human;
      case CellType.Tree:
        return Tree;
      case CellType.Stone:
        return Stone;
      case CellType.Iron:
        return Iron;
      case CellType.Wolf:
        return Wolf;
      case CellType.Bear:
        return Bear;
      case CellType.Deer:
        return Deer;
      case CellType.Water:
        return Water;
      case CellType.DummyCell:
        return DummyCell;
      default:
        return DummyCell;
    }
  }
}
