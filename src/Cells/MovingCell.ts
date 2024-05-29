import { BasicCell } from './BasicCell.js';

export abstract class MovingCell extends BasicCell {
    protected vector: { x: number; y: number } = { x: 0, y: 0 };
    protected actions: Map<string, (x: number, y: number) => void> = new Map();

    action(x: number, y: number): void {
        const newPos = { x: x + this.vector.x, y: y + this.vector.y };
        const cell = this.field.getCell(newPos.x, newPos.y);
        const type = cell.constructor.toString();

        if (this.actions.has(type)) {
            this.actions.get(type)!(newPos.x, newPos.y);
            return;
        }

        this.onUnknownCell(x, y);
    }

    protected onUnknownCell(x: number, y: number) {
        console.log('Unknown cell type!');
    }
    
}