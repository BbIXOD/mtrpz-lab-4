import Field from "../Field.js";
import { Cell } from "./Cell.js";

export abstract class BasicCell implements Cell {
    abstract picture: string;
    protected readonly field: Field<Cell>;

    constructor(field: Field<Cell>) {
        this.field = field;
    }

    abstract action(x: number, y: number): void;
}