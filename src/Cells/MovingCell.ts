import Vector from '../Vector.js';
import { BasicCell } from './BasicCell.js';

export abstract class MovingCell extends BasicCell {
    protected moveVector: Vector = new Vector(0, 0);
    protected actions: Map<string, (x: number, y: number) => void> = new Map();

    action(): void {
        const newPos = { x: this.position.x + this.moveVector.x, y: this.position.y + this.moveVector.y };
        const cell = this.field.getCell(newPos.x, newPos.y);
        const type = cell.constructor.toString();

        if (this.actions.has(type)) {
            this.actions.get(type)!(newPos.x, newPos.y);
            return;
        }

        this.onUnknownCell();
    }

    protected onUnknownCell() {
        console.log('Unknown cell type!');
    }
    
}