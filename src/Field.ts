import Vector from "./Vector";

export default class Field<T> {
  private readonly Cells: T[][];
  private readonly sizeX: number;
  private readonly sizeY: number;

  constructor(x: number, y: number) {
    this.Cells = new Array(x);

    for (let i = 0; i < x; i++) {
      this.Cells[i] = new Array(y);
    }

    this.sizeX = x;
    this.sizeY = y;
  }

  private format(x: number, y: number) {
    x %= this.sizeX;
    y %= this.sizeY;
    x = x < 0 ? x + this.sizeX : x;
    y = y < 0 ? y + this.sizeY : y;
    return [x, y];
  }

  getCell(x: number, y: number) {
    [x, y] = this.format(x, y);
    return this.Cells[x][y];
  }

  getCellV(vector: Vector) {
    return this.getCell(vector.x, vector.y);
  }

  setCell(x: number, y: number, cell: T) {
    [x, y] = this.format(x, y);
    this.Cells[x][y] = cell;
  }

  setCellV(vector: Vector, cell: T) {
    this.setCell(vector.x, vector.y, cell);
  }

  getSymmetric(x: number, y: number, dx: number, dy: number) {
    const result: T[] = [
      this.getCell(x + dx, y + dy),
      this.getCell(x - dx, y - dy),
      this.getCell(x - dx, y + dy),
      this.getCell(x + dx, y - dy),
    ];

    return result;
  }

  public iterate(callback: (x: number, y: number, cell: T) => void) {
    for (let x = 0; x < this.sizeX; x++) {
      for (let y = 0; y < this.sizeY; y++) {
        callback(x, y, this.getCell(x, y));
      }
    }
  }
}
