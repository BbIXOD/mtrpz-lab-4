import Vector from "./Vector.js";

export enum Direction {
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
    }
}