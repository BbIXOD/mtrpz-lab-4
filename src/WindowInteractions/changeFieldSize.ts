import { scaleFactor, setScaleFactor, } from './initializeField.js';
import { resizeCells, } from './initializeCells.js';

let tempScale = scaleFactor;
const minScaleFactor = 0.05;
const maxScaleFactor = 3;
const scaleStep = 0.01;

let resizeInterval: NodeJS.Timeout;
  
function increaseSize() {
    tempScale = Math.min(maxScaleFactor, scaleFactor + scaleStep);
    setScaleFactor(tempScale);
    resizeCells();
}
  
function decreaseSize() {
    tempScale = Math.max(minScaleFactor, scaleFactor - scaleStep);
    setScaleFactor(tempScale);
    resizeCells();
}
  
export function makeActualSize() {
    setScaleFactor(1);
    resizeCells();
}
  
export function startIncreaseSizeTime() {
    increaseSize();
    resizeInterval = setInterval(increaseSize, 100);
}
  
export function startDecreaseSizeTime() {
    decreaseSize();
    resizeInterval = setInterval(decreaseSize, 100);
}
  
export function stopResize() {
    clearInterval(resizeInterval);
}
