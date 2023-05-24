const DEFAULT_DRAWING_COLOR = '#333333';
const DEFAULT_MODE = 'color';
const DEFAULT_GRID_SIZE = 16;
const DEFAULT_GRID_CELL_COLOR = '#fefefe'

let drawingColor = DEFAULT_DRAWING_COLOR;
let usedMode = DEFAULT_MODE;
let gridSize = DEFAULT_GRID_SIZE;

let mouseDown = false;

const colorPicker = document.getElementById('color-picker');

const modeBtns = new Map([
  ['color', document.getElementById('color-btn')],
  ['rainbow', document.getElementById('rainbow-btn')],
  ['erase', document.getElementById('erase-btn')]
]);

const btnColor = new Map([
  ['color', () => drawingColor],
  ['rainbow', () => `rgb(${getRandomDeg()}, ${getRandomDeg()}, ${getRandomDeg()})`],
  ['erase', () => DEFAULT_GRID_CELL_COLOR]
]);

const clearBtn = document.getElementById('clear-btn');

const gridSizeLabel = document.getElementById('grid-size');

const gridSizeSlider = document.getElementById('grid-size-slider');

const grid = document.getElementById('grid');

function deactivateBtn(mode) {
  modeBtns.get(mode).classList.remove('active');
}

function activateBtn(mode) {
  modeBtns.get(mode).classList.add('active');
}

function clearGrid() {
  grid.innerHTML = '';
}

function getRandomDeg() {
  return Math.floor(Math.random() * 256);
}

function setColor(e) {
  if (e.type === 'mouseover' && !mouseDown) {
    return;
  }

  drawingColor = btnColor.get(usedMode)();

  e.target.style['background-color'] = drawingColor;
}

function setupGrid(size) {
  grid.style['grid-template-rows'] = `repeat(${size}, 1fr)`;
  grid.style['grid-template-columns'] = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; ++i) {
    const gridCell = document.createElement('div');
    gridCell.classList.add('grid-cell');

    gridCell.addEventListener('mousedown', setColor);
    gridCell.addEventListener('mouseover', setColor);
    
    grid.appendChild(gridCell);
  }
}

function reloadGrid() {
  clearGrid();
  setupGrid(gridSize);
}

function resetGrid() {
  grid.childNodes.forEach((cell) => {
    cell.style['background-color'] = DEFAULT_GRID_CELL_COLOR;
  });
}

colorPicker.addEventListener('input', (e) => {
  drawingColor = e.target.value;
});

modeBtns.forEach((btn, mode) => {
  btn.addEventListener('click', () => {
    deactivateBtn(usedMode);
    usedMode = mode;
    activateBtn(mode);
  });
});

clearBtn.addEventListener('click', resetGrid);

document.body.addEventListener('mousedown', () => mouseDown = true);

document.body.addEventListener('mouseup', () => mouseDown = false);

gridSizeSlider.addEventListener('mousemove', (e) => {
  newSizeValue = e.target.value;
  gridSizeLabel.textContent = `${newSizeValue} x ${newSizeValue}`;
});

gridSizeSlider.addEventListener('change', (e) => {
  gridSize = e.target.value;
  reloadGrid();
});

window.addEventListener('load', () => {
  setupGrid(DEFAULT_GRID_SIZE);
  activateBtn(DEFAULT_MODE);
});
