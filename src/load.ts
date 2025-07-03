export const gridSize = 5

// const DOM_grid : HTMLElement | null = document.getElementById("grid").

export const DOM_grid = document.getElementById("grid")


if (DOM_grid) {
  DOM_grid.style.gridTemplateColumns = `repeat(${gridSize}, 0fr)`;
  DOM_grid.style.gridTemplateRows = `repeat(${gridSize}, 0fr)`;
}
