import Field from '../Field.js';
import { Cell } from './Cell.js';

export class DummyCell implements Cell {
  picture: string;
  field: Field<Cell>;

  images: string[] = [
    '../pictures/arrow_up.png',
    '../pictures/arrow_right.png',
    '../pictures/arrow_down.png',
    '../pictures/arrow_left.png',
    '../pictures/default_cell.png',
  ];

  currentIndex = 0;

  constructor(picture = '', field: Field<Cell>) {
    this.picture = picture;
    this.field = field;
  }

  action(x: number, y: number): void {
    const cellElement = document.querySelector(
      `.cell[data-x="${x}"][data-y="${y}"]`,
    );
    if (cellElement) {
      const imageUrl = this.images[this.currentIndex];

      let img = cellElement.querySelector('img');
      if (!img) {
        img = document.createElement('img');
        cellElement.appendChild(img);
      }

      img.src = imageUrl;

      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }
}
