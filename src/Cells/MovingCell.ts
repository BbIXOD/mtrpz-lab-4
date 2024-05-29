import Vector from '../Vector.js';
import { BasicCell } from './BasicCell.js';
import { Cell } from './Cell.js';

export abstract class MovingCell extends BasicCell {
    moveVector: Vector = new Vector(0, 0);
    protected actions: Map<string, (cell: Cell) => void> = new Map();

    action(): void {
        const nextPosition = this.position.add(this.moveVector);
        const cell = this.field.getCellV(nextPosition);
        const type = cell?.constructor.name || '';

        if (this.actions.has(type)) {
            this.actions.get(type)!(cell);
            return;
        }

        this.onUnknownCell();
    }

    protected onUnknownCell() {
        console.log('Unknown cell type!');
    }
    
}