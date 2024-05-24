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

    getCell(x: number, y: number) {
        x %= this.sizeX
        y %= this.sizeY
        x = x < 0 ? x + this.sizeX : x
        y = y < 0 ? y + this.sizeY : y
        return this.Cells[x][y]
    }

    getSymmetric(x: number, y: number, dx: number, dy: number) {
        const result: Cell[] = [
            this.getCell(x + dx, y + dy),
            this.getCell(x - dx, y - dy),
            this.getCell(x - dx, y + dy),
            this.getCell(x + dx, y - dy)
        ]

        return result
    }

    turn() {
        this.iterate((x, y, cell) => cell?.action(x, y))
    }

    private iterate(callback: (x: number, y: number, cell: Cell) => void) {
        for (let x = 0; x < this.sizeX; x++) {
            for (let y = 0; y < this.sizeY; y++) {
                callback(x, y, this.getCell(x, y))
            }
        }
    }
}