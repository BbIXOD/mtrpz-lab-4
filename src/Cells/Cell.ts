export interface Cell {
    picture: string 

    action(x: number, y: number): void
}