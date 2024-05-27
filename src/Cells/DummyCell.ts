import { Cell } from "./Cell.js";

export class DummyCell implements Cell {
    picture: string;

    images: string[] = [
        "../pictures/arrow_up.png",
        "../pictures/arrow_right.png",
        "../pictures/arrow_down.png",
        "../pictures/arrow_left.png",
        "../pictures/default_cell.png",
    ];
    currentIndex: number = 0;

    constructor(picture: string = "") {
        this.picture = picture;
    }

    action(x: number, y: number): void {
        const cellElement = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
        if (cellElement) {
            const imageUrl = this.images[this.currentIndex];
    
            const img = document.createElement('img');
            img.src = imageUrl;
            cellElement.innerHTML = '';
            cellElement.appendChild(img);

            this.currentIndex = (this.currentIndex + 1) % this.images.length;
        }
    }    
}