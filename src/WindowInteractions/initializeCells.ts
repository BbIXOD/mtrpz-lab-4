import { Direction } from '../Direction.js';
import { ArrowCell, Cell, DummyCell, Home, Human } from '../Cells/Cells.js';
import { CellFactory, CellType } from '../CellFactory.js';

import {
    fieldContainer,
    fieldElement,
    panelElement,
    scaleDisplay,
    humanHungerDisplay,
    humanDirectionDisplay,
} from '../index.js';

import {
    fieldSizeX,
    fieldSizeY,
    field,
    scaleFactor,
} from './initializeField.js';

let cellsArray: HTMLElement[] = [];

export function resizeCells() {
    if (!fieldContainer || !fieldElement || !panelElement) return;
    const containerWidth = fieldContainer.clientWidth;
    const containerHeight = window.innerHeight - panelElement.offsetHeight;
  
    const baseCellWidth = containerWidth / fieldSizeX;
    const baseCellHeight = containerHeight / fieldSizeY;
    const baseCellSize = Math.min(baseCellWidth, baseCellHeight);
  
    const cellSize = baseCellSize * scaleFactor;
  
    fieldElement.style.width = `${baseCellSize * fieldSizeX}px`;
    fieldElement.style.height = `${baseCellSize * fieldSizeY}px`;
  
    fieldElement.style.gridTemplateColumns = `repeat(${fieldSizeX}, ${cellSize}px)`;
    fieldElement.style.gridTemplateRows = `repeat(${fieldSizeY}, ${cellSize}px)`;
  
    cellsArray.forEach((element) => {
      element.style.width = `${cellSize}px`;
      element.style.height = `${cellSize}px`;
  
      const img = element.querySelector('img');
      if (img) {
        img.style.width = `${cellSize}px`;
        img.style.height = `${cellSize}px`;
      }
    });
  
    scaleDisplay!.textContent = `Scale: ${Math.round(scaleFactor * 100)}%`;
}
  
export function createField() {
    cellsArray = [];
  
    while (fieldElement!.firstChild) {
      fieldElement!.removeChild(fieldElement!.firstChild);
    }
  
    for (let y = 0; y < fieldSizeY; y++) {
      for (let x = 0; x < fieldSizeX; x++) {
        const cellElement = document.createElement('div');
        cellElement.className = 'cell';
        cellElement.dataset.x = x.toString();
        cellElement.dataset.y = y.toString();
        cellElement.addEventListener('click', handleCellClick);
  
        const cell = field.getCell(x, y);
        if (cell.picture) {
          const img = document.createElement('img');
          img.src = cell.picture;
          img.alt = `Cell at (${x}, ${y})`;
          cellElement.appendChild(img);
        }
  
        cellsArray.push(cellElement);
  
        fieldElement!.appendChild(cellElement);
      }
    }
}
  
function handleCellClick(event: MouseEvent) {
    if (!event.target) return;
    const target = event.target as HTMLElement;
    const closestCell = target.closest('.cell') as HTMLElement;
    if (!closestCell) return;
  
    const x = closestCell.dataset.x;
    const y = closestCell.dataset.y;
    const cell = field.getCell(Number(x), Number(y));
  
    if (cell) {
      cycleCellState(cell);
      updateFieldImages();
    }
}
  
function cycleCellState(cell: Cell) {
    makeHumanIformationDissapiar();
    if (cell instanceof DummyCell) {
      if (!homeCellExists()) {
        CellFactory.createCellV(CellType.Home, field, cell.position);
      } else {
        CellFactory.createArrowCell(
          field,
          cell.position.x,
          cell.position.y,
          Direction.UP,
        );
      }
    }
  
    if (cell instanceof ArrowCell) {
      if (cell.arrowDirection === Direction.UP) {
        CellFactory.createArrowCell(
          field,
          cell.position.x,
          cell.position.y,
          Direction.RIGHT,
        );
      } else if (cell.arrowDirection === Direction.RIGHT) {
        CellFactory.createArrowCell(
          field,
          cell.position.x,
          cell.position.y,
          Direction.DOWN,
        );
      } else if (cell.arrowDirection === Direction.DOWN) {
        CellFactory.createArrowCell(
          field,
          cell.position.x,
          cell.position.y,
          Direction.LEFT,
        );
      } else if (cell.arrowDirection === Direction.LEFT) {
        CellFactory.createCellV(CellType.DummyCell, field, cell.position);
      }
    }
  
    if (cell instanceof Human) {
      humanHungerDisplay!.textContent = `Hunger: ${cell.hunger}`;
      humanHungerDisplay!.style.display = 'block';
      const direction = (cell.moveVector.x === 0) ? (cell.moveVector.y === 1) ? 'DOWN' : 'UP' : (cell.moveVector.x === 1) ? 'RIGHT' : 'LEFT';
      humanDirectionDisplay!.textContent = `Direction: ${direction}`;
      humanDirectionDisplay!.style.display = 'block';
    }
}
  
export function homeCellExists(): boolean {
    for (let y = 0; y < fieldSizeY; y++) {
      for (let x = 0; x < fieldSizeX; x++) {
        const cell = field.getCell(x, y);
        if (cell instanceof Home) {
          return true;
        }
      }
    }
    return false;
}
  
export function makeHumanIformationDissapiar() {
    humanHungerDisplay!.textContent = `Hunger: :)`;
    humanHungerDisplay!.style.display = 'none';
    humanDirectionDisplay!.textContent = 'Direction: :)';
    humanDirectionDisplay!.style.display = 'none';
}
  
export function updateFieldImages() {
    cellsArray.forEach((element) => {
    const x = parseInt(element.dataset.x || '0');
    const y = parseInt(element.dataset.y || '0');
    const fieldCell = field.getCell(x, y);
    
    if (fieldCell.picture) {
        let img = element.querySelector('img');
        if (!img) {
        img = document.createElement('img');
        element.appendChild(img);
        }
          img.src = fieldCell.picture;
        }
    });
}
