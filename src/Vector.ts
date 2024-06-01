export default class Vector {
  // eslint-disable-next-line no-useless-constructor
  constructor(public x: number, public y: number) {}

  add(vector: Vector) {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector: Vector) {
    return new Vector(this.x - vector.x, this.y - vector.y);
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  invert() {
    return new Vector(-this.x, -this.y);
  }
}
