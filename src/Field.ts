export default class Field<T> {
  Cells: T[][];
  sizeX: number;
  sizeY: number;

  constructor(x: number, y: number) {
    this.Cells = new Array(x);

    for (let i = 0; i < x; i++) {
      this.Cells[i] = new Array(y);
    }

    this.sizeX = x;
    this.sizeY = y;
  }

  getCell(x: number, y: number) {
    x %= this.sizeX;
    y %= this.sizeY;
    x = x < 0 ? x + this.sizeX : x;
    y = y < 0 ? y + this.sizeY : y;
    return this.Cells[x][y];
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
