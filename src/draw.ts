// import { map } from "./main.js";

import { GS, DOM_grid, snake, modifyGrid, map } from "./load.js";

const nbBarTempo = 2;

const DOM_goodTempo: HTMLElement [] =  [...document.getElementsByClassName("good-tempo")] as HTMLElement[];
const DOM_badTempo: HTMLElement [] = [...document.getElementsByClassName("bad-tempo")] as HTMLElement[];


DOM_goodTempo.forEach(div => {
  div.style = `height: ${GS.tempoSnake/nbBarTempo*100}%`
});

DOM_badTempo.forEach(div => {
  div.style = `height: ${ (1-(GS.tempoSnake/nbBarTempo))*100}%`
});

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

const DOM_tempoUp: HTMLElement | null = document.getElementById("tempo-up");
const DOM_tempoDown: HTMLElement | null = document.getElementById("tempo-down");


const tempoBars: TempoBar[] = [];



class TempoBar {
  posOY: number;
  posY = 0;
  isTopOrBottom: "top" | "bottom";
  DOM: HTMLImageElement;
  heightBar : number

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

    this.heightBar=this.DOM.naturalHeight
    this.posOY = pPosOY -10 ;

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
    tempoBars.push(new TempoBar(true, 0 +i* (GS.windowSize/2)/nbBarTempo ));
    DOM_tempoUp.appendChild(tempoBars[i*2].DOM);
    tempoBars.push(new TempoBar(false, 0 +i* (GS.windowSize/2)/nbBarTempo ));
    DOM_tempoDown.appendChild(tempoBars[i*2+1].DOM);

  }
} else {
  alert("error dom ");
}


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
          const apple: HTMLImageElement = document.createElement("img");
          apple.src = "img/snakesprites/png/apple.png";
          apple.classList.add("cell");
          cell?.appendChild(apple);
        } else if (map[line][column] === snake.lg) {
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
