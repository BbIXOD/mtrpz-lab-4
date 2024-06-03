export const fieldContainer = document.getElementById('field-container');
export const fieldElement = document.getElementById('field');
export const panelElement = document.getElementById('panel');
export const scaleDisplay = document.getElementById('scaleDisplay');
export const speedDisplay = document.getElementById('speedDisplay');
export const moveDisplay = document.getElementById('moveDisplay');
export const humanCountDisplay = document.getElementById('humanCountDisplay');
export const humanHungerDisplay = document.getElementById('humanHungerDisplay');
export const humanDirectionDisplay = document.getElementById('humanDirectionDisplay');
export const fieldSizeInput = document.getElementById('fieldSizeInput') as HTMLInputElement;
export const sizeModal = document.getElementById('sizeModal') as HTMLElement;
export const modalOkButton = document.getElementById('modalOkButton') as HTMLElement;
export const closeButton = document.querySelector('.close') as HTMLElement;
export const startStopMoveButton = document.getElementById('buttonStartStopMove') as HTMLElement;
export const gameOverModal = document.getElementById('gameOverModal') as HTMLElement;

if (
  !fieldContainer ||
  !fieldElement ||
  !panelElement ||
  !scaleDisplay ||
  !speedDisplay ||
  !moveDisplay ||
  !fieldSizeInput ||
  !sizeModal ||
  !modalOkButton ||
  !closeButton ||
  !startStopMoveButton
) {
  throw new Error('Failed to get elements');
}