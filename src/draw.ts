import { GS, DOM_grid, snake, modifyGrid, map } from "./load.js";
import { Direction, sDerDir, sDir, tempo } from "./main.js";

const nbBarTempo = 3;

const DOM_goodTempo: HTMLElement[] = [
  ...document.getElementsByClassName("good-tempo"),
] as HTMLElement[];
const DOM_badTempo: HTMLElement[] = [
  ...document.getElementsByClassName("bad-tempo"),
] as HTMLElement[];

DOM_goodTempo.forEach((div) => {
  div.style = `height: ${(GS.tempoSnake / nbBarTempo) * 100}%`;
});

DOM_badTempo.forEach((div) => {
  div.style = `height: ${(1 - GS.tempoSnake / nbBarTempo) * 100}%`;
});

const cellsW = GS.windowSize / GS.gridSize;

const fillGrid: (i: number, j: number, cell: number) => void = (
  i: number,
  j: number,
  cell: number
) => {
  const newCell: HTMLElement = document.createElement("div");
  newCell.id = `l${i}_c${j}`;
  newCell.classList.add("cell");
  newCell.style.height = cellsW + "px";
  newCell.style.width = cellsW + "px";

  DOM_grid?.appendChild(newCell);
};

modifyGrid(fillGrid);

const tete: HTMLImageElement = document.createElement("img");
tete.src = "img/snakesprites/png/snake_1.png";

document.getElementById(`l1_c3`)?.appendChild(tete);

const DOM_tempoUp: HTMLElement | null = document.getElementById("tempo-up");
const DOM_tempoDown: HTMLElement | null = document.getElementById("tempo-down");

const tempoBars: TempoBar[] = [];

class TempoBar {
  posOY: number;
  posY = 0;
  isTopOrBottom: "top" | "bottom";
  DOM: HTMLImageElement;

  constructor(pIsGoingdown: boolean, pPosOY: number) {
    if (pIsGoingdown) {
      this.isTopOrBottom = "top";
    } else {
      this.isTopOrBottom = "bottom";
    }

    this.posY = pPosOY;

    this.DOM = document.createElement("img");
    this.DOM.src = "img/snakesprites/png/tempo.png";
    this.DOM.classList.add("tempo-bar");

    this.posOY = pPosOY - 10;
  }

  createDom() {
    const newTempo: HTMLImageElement = document.createElement("img");
    newTempo.src;
  }

  updatePos(pSnakeTimer: number) {
    this.posY =
      this.posOY +
      ((pSnakeTimer / GS.speedSnake) * GS.windowSize) / 2 / nbBarTempo;
    this.DOM.style = `${this.isTopOrBottom} : ${this.posY}px`;
  }
}

if (DOM_tempoUp && DOM_tempoDown) {
  for (let i = 0; i < nbBarTempo; i++) {
    tempoBars.push(
      new TempoBar(true, 0 + (i * (GS.windowSize / 2)) / nbBarTempo)
    );
    DOM_tempoUp.appendChild(tempoBars[i * 2].DOM);
    tempoBars.push(
      new TempoBar(false, 0 + (i * (GS.windowSize / 2)) / nbBarTempo)
    );
    DOM_tempoDown.appendChild(tempoBars[i * 2 + 1].DOM);
  }
} else {
  alert("error dom ");
}

const rotateSprite: (dir: Direction) => string = (dir) => {
  let degreeReturned = "";

  if (dir === "up") {
    degreeReturned = "0";
  }
  if (dir === "right") {
    degreeReturned = "90";
  }
  if (dir === "down") {
    degreeReturned = "180";
  }
  if (dir === "left") {
    degreeReturned = "270";
  }

  return "rotateZ(" + degreeReturned + "deg)";
};

export const updateDOM = (sTimer: number, isTempo: boolean) => {
  tempoBars.forEach((element) => {
    element.updatePos(sTimer);
  });

  for (let line = 0; line < GS.gridSize; line++) {
    for (let column = 0; column < GS.gridSize; column++) {
      const cell = document.getElementById(`l${line}_c${column}`);

      if (cell != null) {
        //clear cells
        cell.innerHTML = "";
      }

      if (map && map[line][column]) {
        if (map[line][column] < 0) {
          if (map[line][column] === -1) {
            const apple: HTMLImageElement = document.createElement("img");
            apple.src = "img/snakesprites/png/apple.png";
            apple.classList.add("cell");
            cell?.appendChild(apple);
          } else {
            const bomb: HTMLImageElement = document.createElement("img");
            bomb.src = "img/snakesprites/png/bomb_64.png";
            bomb.classList.add("cell");
            cell?.appendChild(bomb);
          }
        } else if (map[line][column] === snake.lg) {
          const tete: HTMLImageElement = document.createElement("img");

          if (isTempo) {
            tete.src =
              "img/snakesprites/png/s_"+(tempo.countAll % 2)+"_head_tong.png";
          } else {
            tete.src =
              "img/snakesprites/png/s_" +
              (tempo.countAll % 2) +
              "_head.png";
          }

          tete.style.width = cellsW + "px";
          tete.style.transform = rotateSprite(sDerDir);

          cell?.appendChild(tete);
        } else if (map[line][column] > 1) {
          const queue: HTMLImageElement = document.createElement("img");
          queue.src = "img/snakesprites/png/s_"+(tempo.countAll % 2)+"_body.png";
          // queue.classList.add("cell");

          queue.style.width = cellsW + "px";
          queue.style.transform = rotateSprite(sDerDir);
          cell?.appendChild(queue);
        }
        else if (map[line][column] == 1) {
          const queue: HTMLImageElement = document.createElement("img");
          queue.src = "img/snakesprites/png/s_"+(tempo.countAll % 2)+"_tail.png";
          // queue.classList.add("cell");

          queue.style.width = cellsW + "px";
          queue.style.transform = rotateSprite(sDerDir);
          cell?.appendChild(queue);
        }
      }
    }
  }
};
