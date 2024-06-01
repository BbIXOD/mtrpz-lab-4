import Vector from './Vector.js';

export enum Direction {
  NONE = 0,
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

export const getVector = (direction: Direction): Vector => {
  switch (direction) {
    case Direction.UP:
      return new Vector(0, -1);
    case Direction.RIGHT:
      return new Vector(1, 0);
    case Direction.DOWN:
      return new Vector(0, 1);
    case Direction.LEFT:
      return new Vector(-1, 0);
    default:
      return new Vector(0, 0);
  }
};

export const getDirection = (vector: Vector): Direction => {
  if (vector.y < 0) {
    return Direction.UP;
  } else if (vector.x > 0) {
    return Direction.RIGHT;
  } else if (vector.y > 0) {
    return Direction.DOWN;
  } else if (vector.x < 0) {
    return Direction.LEFT;
  }
  return Direction.NONE;
};
