import Field from "../Field.js";
import Vector from "../Vector.js";
import { Cell } from "./Cell.js";

export abstract class BasicCell implements Cell {
    abstract picture: string;
    position: Vector;
    protected readonly field: Field<Cell>;

    constructor(field: Field<Cell>, x: number, y: number) {
        this.position = new Vector(x, y);
        this.field = field;
        field.setCell(x, y, this);
    }

    abstract action(): void;
}