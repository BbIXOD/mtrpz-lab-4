import Cell from "./Cell"

export default class Field {
    Cells: Cell[][]
    sizeX: number
    sizeY: number

    constructor(x: number, y: number) {
        this.Cells = new Array(x)

        for (let i = 0; i < x; i++) {
            this.Cells[i] = new Array(y)
        }

        this.sizeX = x
        this.sizeY = y
    }

    getCell(x: number, y: number): Cell {
        x %= this.sizeX
        y %= this.sizeY
        x = x < 0 ? x + this.sizeX : x
        y = y < 0 ? y + this.sizeY : y
        return this.Cells[x][y]
    }

    getSymmetric(x: number, y: number, dx: number, dy: number): Cell[] {
        const result: Cell[] = [
            this.getCell(x + dx, y + dy),
            this.getCell(x - dx, y - dy),
            this.getCell(x - dx, y + dy),
            this.getCell(x + dx, y - dy)
        ]

        return result
    }
}