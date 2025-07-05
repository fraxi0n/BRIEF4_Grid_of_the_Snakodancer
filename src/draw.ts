// import { map } from "./main.js";

import { gridSize, DOM_grid, snake, modifyGrid, map } from "./load.js";

// const DOM_grid = document.getElementById("DOM_grid")

const fillGrid: (i: number, j: number, cell: number) => void = (
  i: number,
  j: number,
  cell: number
) => {
  const newCell: HTMLElement = document.createElement("div");
  newCell.id = `l${i}_c${j}`;
  newCell.classList.add("cell");
  DOM_grid?.appendChild(newCell);
};

modifyGrid(fillGrid);

const tete: HTMLImageElement = document.createElement("img");
tete.src = "img/snakesprites/png/snake_1.png";

document.getElementById(`l1_c3`)?.appendChild(tete);

const DOM_tempoUp: HTMLElement | null = document.getElementById("tempoUp");

const createDomTempo = () => {
  const newTempo: HTMLImageElement = document.createElement("img");
  newTempo.src = "img/snakesprites/png/tempo.png";
  newTempo.classList.add("tempo-bar");

  if (DOM_tempoUp){

      DOM_tempoUp.appendChild(newTempo);
  } 
  else { alert ("error dom ")}
};


createDomTempo()

export const updateDOM = (sTimer: number, isTempo: boolean) => {
  for (let line = 0; line < gridSize; line++) {
    for (let column = 0; column < gridSize; column++) {
      const cell = document.getElementById(`l${line}_c${column}`);

      if (cell !== null) {
        cell.innerText = "test";
        cell.innerHTML = "";
      }

      if (map && map[line][column]) {
        if (map[line][column] === snake.lg) {
          const tete: HTMLImageElement = document.createElement("img");
          tete.src = "img/snakesprites/png/snake_1.png";
          tete.classList.add("cell");
          if (isTempo) {
            tete.style.width = "25px";
            tete.style.height = "25px";
          }

          cell?.appendChild(tete);
        } else if (map[line][column] > 0) {
          const queue: HTMLImageElement = document.createElement("img");
          queue.src = "img/snakesprites/png/corps.png";
          queue.classList.add("cell");
          if (isTempo) {
            queue.style.width = "25px";
            queue.style.height = "25px";
          }
          cell?.appendChild(queue);
        }
      }
    }
  }
};
