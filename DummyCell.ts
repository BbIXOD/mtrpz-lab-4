import Cell from "./Cell";

export default class DummyCell implements Cell {
    picture: string;
    action(x: number, y: number): void {}
}