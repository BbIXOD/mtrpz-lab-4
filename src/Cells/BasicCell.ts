import Field from "../Field.js";
import { Cell } from "./Cell.js";

export abstract class BasicCell implements Cell {
    abstract picture: string;
    private readonly field: Field<Cell>;
    private actions: Map<string, (x: number, y: number) => void> = new Map();

    constructor(field: Field<Cell>) {
        this.field = field;
    }

    action(x: number, y: number): void {
        const cell = this.field.getCell(x, y);
        const type = cell.constructor.toString();
        if (!this.actions.has(type)) throw new Error('Unknown cell type: ' + type);
        this.actions.get(type)!.call(this, x, y);
    }
}