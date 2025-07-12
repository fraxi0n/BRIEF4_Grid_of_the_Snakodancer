import { GS, DOM_grid, snake, modifyGrid, map } from "./load.js";
import { Direction, sHistoryDir, tempo } from "./main.js";

let nbBarTempo = 3;

if (GS.tempoSnake<=0.2)
{
  nbBarTempo=2
}
if (GS.tempoSnake>=0.7)
{
  nbBarTempo=5
}

const DOM_daddy : HTMLElement | null = document.getElementById("daddy");


if (DOM_daddy)
{
DOM_daddy.style.height = GS.windowSize+"px"


}


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
  newCell.classList.add("cell", "cell-"+((i+j)%2) );
  newCell.style.height = cellsW + "px";
  newCell.style.width = cellsW + "px";

  DOM_grid?.appendChild(newCell);
};

modifyGrid(fillGrid);

const tete: HTMLImageElement = document.createElement("img");
tete.src = "img/snakesprites/png/snake_1.png";

document.getElementById(`l1_c3`)?.appendChild(tete);

// const DOM_tempoUp: HTMLElement | null = document.getElementById("tempo-up");
// const DOM_tempoDown: HTMLElement | null = document.getElementById("tempo-down");

const DOM_tempoUp: NodeListOf<Element>  = document.querySelectorAll(".tempo-up");
const DOM_tempoDown: NodeListOf<Element> = document.querySelectorAll(".tempo-down");


// const tempoBars: TempoBar[] = [];
const tempoBars: TempoBar[][] = [[],[]];


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

if (DOM_tempoUp[0] && DOM_tempoDown[0] && DOM_tempoUp[1] && DOM_tempoDown[1]) {
  for(let i2 = 0 ; i2<2 ; i2++ )
  {
  for (let i = 0; i < nbBarTempo; i++) {
    

      tempoBars[i2].push(
        new TempoBar(true, 0 + (i * (GS.windowSize / 2)) / nbBarTempo)
      );
      DOM_tempoUp[i2].appendChild(tempoBars[i2][i * 2].DOM);
      // DOM_tempoUp[1].appendChild(tempoBars[i * 2].DOM);
      
      tempoBars[i2].push(
        new TempoBar(false, 0 + (i * (GS.windowSize / 2)) / nbBarTempo)
      );
      DOM_tempoDown[i2].appendChild(tempoBars[i2][i * 2 + 1].DOM);
      // DOM_tempoDown[1].appendChild(tempoBars[i * 2 + 1].DOM);
    }

  }
} else {
  console.log (DOM_tempoUp)
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
let styleSnake: number[] = [];

export const getStyleBody = () => {
  let tete: Direction = sHistoryDir[sHistoryDir.length - 1];
  let queue: Direction = sHistoryDir[sHistoryDir.length - 2];
  let styleCase = 0;

  if (tete == queue) {
    if (tete == "up" || tete == "down") {
      styleCase = 1; // droit pas de rota
    } else {
      styleCase = 2; // droit rota 90
    }
  } else {
    // console.log(line , column ,  map[line][column] , sHistoryDir);

    if (queue == "down" && tete == "left") {
      styleCase = 3;
    }
    if (queue == "right" && tete == "up") {
      styleCase = 3;
    }

    //90

    if (queue == "down" && tete == "right") {
      styleCase = 4;
    }
    if (queue == "left" && tete == "up") {
      styleCase = 4;
    }

    // 180
    if (queue == "up" && tete == "right") {
      styleCase = 5;
    }
    if (queue == "left" && tete == "down") {
      styleCase = 5;
    }

    // 270
    if (queue == "right" && tete == "down") {
      styleCase = 6;
    }
    if (queue == "up" && tete == "left") {
      styleCase = 6;
    }
  }
  styleSnake[snake.y * 10 + snake.x] = styleCase;
};

// export const getStyle

export const updateDOM = (sTimer: number, isTempo: boolean) => {
  tempoBars[0].forEach((barre) => {
    barre.updatePos(sTimer);
  });
    tempoBars[1].forEach((barre) => {
    barre.updatePos(sTimer);
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
            apple.src = "img/snakesprites/png/apple_32.gif";
            apple.style.width =   cellsW *0.6 + "px";
            cell?.appendChild(apple);
          } else {
            const bomb: HTMLImageElement = document.createElement("img");
            bomb.src = "img/snakesprites/png/bomb_64.png";
            cell?.appendChild(bomb);
          }
        } else if (map[line][column] === snake.lg) {
          const tete: HTMLImageElement = document.createElement("img");

          if (isTempo) {
            tete.src =
              "img/snakesprites/png/s_" +
              (tempo.countAll % 2) +
              "_head_tong.png";
          } else {
            tete.src =
              "img/snakesprites/png/s_" + (tempo.countAll % 2) + "_head.png";
          }

          tete.style.width = cellsW + "px";
          tete.style.transform = rotateSprite(sHistoryDir[sHistoryDir.length-1]);

          cell?.appendChild(tete);
        } else if (map[line][column] > 1) {
          const sBody: HTMLImageElement = document.createElement("img");

          let front: Direction =
            sHistoryDir[sHistoryDir.length - (map[line][column] - 1)];

          let back: Direction =
            sHistoryDir[sHistoryDir.length - (map[line][column] - 2)];

          switch (styleSnake[line * 10 + column]) {
            case 1:
              sBody.src =
                "img/snakesprites/png/s_" + (tempo.countAll % 2) + "_body.png";

              break;
            case 2:
              sBody.src =
                "img/snakesprites/png/s_" + (tempo.countAll % 2) + "_body.png";
              sBody.style.transform = "rotateZ(90deg)";

              break;
            case 3:
              sBody.src =
                "img/snakesprites/png/s_" +
                (tempo.countAll % 2) +
                "_body_corner.png";

              break;
            case 4:
              sBody.src =
                "img/snakesprites/png/s_" +
                (tempo.countAll % 2) +
                "_body_corner.png";
              sBody.style.transform = "rotateZ(90deg)";

              break;
            case 5:
              sBody.src =
                "img/snakesprites/png/s_" +
                (tempo.countAll % 2) +
                "_body_corner.png";
              sBody.style.transform = "rotateZ(180deg)";

              break;
            case 6:
              sBody.src =
                "img/snakesprites/png/s_" +
                (tempo.countAll % 2) +
                "_body_corner.png";
              sBody.style.transform = "rotateZ(270deg)";

              break;
            default:
              throw new Error(
                `Valeur inattendue : ${styleSnake[line * 10 + column]}`
              );
          }

          sBody.style.width = cellsW + "px";
          cell?.appendChild(sBody);
        } else if (map[line][column] == 1) {
          const queue: HTMLImageElement = document.createElement("img");
          queue.src =
            "img/snakesprites/png/s_" + (tempo.countAll % 2) + "_tail.png";
          queue.style.width = cellsW + "px";
          queue.style.transform = rotateSprite(
            sHistoryDir[sHistoryDir.length - snake.lg + 1]
          );
          cell?.appendChild(queue);
        }
      }
    }
  }
};
