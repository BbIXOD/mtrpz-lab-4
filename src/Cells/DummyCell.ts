import Cell from "../Cell.js";

export default class DummyCell implements Cell {
    picture: string;

    constructor(picture: string = "") {
        this.picture = picture;
    }

    action(x: number, y: number): void {
        alert(`Clicked cell at (${x}, ${y})!`);
    }
}