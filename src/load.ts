type BPM = 115 | 130 | 150;
const gameStatBPM: BPM = 115; // séparer pour le typage et le calcul

const GS = {
  //GAME STATS

  windowSize: window.innerHeight - 10, //todo
  soundOn: true,
  bpm: gameStatBPM,

  isGOD: false, // todo real death screen

  isWallKilling: false,
  gridSize: 9,

  nbApple: 5,
  isAppleRespawn: true,

  speedSnake: 1000 / (gameStatBPM / 60),
  tempoSnake: 0.66, // 0.1-> 1

  isOutTempoBomb: true,

  //valeur de départ peu d'importance
  snakeLg: 2,
  snakeOX: 9, //not use
  snakeOY: 2, // not use
  isTempoRequired: true, // pas changer
  countFailBomb: 3, // pas changerou 2 ou 4

  moveHistory: false, // todo pas prio

  run: false, // true = run des le launch
};

export const audio = {
  115: new Audio("../music/115.mp3"),
  130: new Audio("../music/130.mp3"),
  150: new Audio("../music/150.mp3"),
};

const map: number[][] = Array.from({ length: GS.gridSize }, () =>
  Array(GS.gridSize).fill(0)
);

const DOM_grid: HTMLElement | null = document.getElementById("grid");


if (DOM_grid)
{
DOM_grid.style.height =  GS.windowSize +"px"

  DOM_grid.style.gridTemplateColumns = `repeat(${GS.gridSize}, 0fr)`;
  DOM_grid.style.gridTemplateRows = `repeat(${GS.gridSize}, 0fr)`;
}

const apple = { x: 0, y: 0 };
const bomb = { x: 0, y: 0 };

const createApple = () => {
  let securityCount = 0;

  do {
    securityCount++;
    apple.x = Math.floor(Math.random() * GS.gridSize);
    apple.y = Math.floor(Math.random() * GS.gridSize);
  } while (map[apple.x][apple.y] !== 0 && securityCount < 1000);

  if (securityCount > 100) {
    gameOver();
  }

  map[apple.x][apple.y] = -1;
};

const createBomb = () => {
  let securityCount = 0;

  do {
    securityCount++;
    console.log(securityCount);
    bomb.x = Math.floor(Math.random() * GS.gridSize);
    bomb.y = Math.floor(Math.random() * GS.gridSize);
  } while (map[bomb.x][bomb.y] !== 0 && securityCount < 1000);

  if (securityCount > 100) {
    gameOver();
  }

  map[bomb.x][bomb.y] = -10;
};

for (let i = 1; i <= GS.nbApple; i++) {
  createApple();
}

const gameOver = () => {
  if (!GS.isGOD) {
    audio[GS.bpm].pause();

    alert("GAME OVER press F5");
  }
};

const snake = {
  x: GS.gridSize - 1,
  y: 0,
  lg: GS.snakeLg,

  left: () => {
    snake.x--;
    if (snake.x < 0) {
      GS.isWallKilling && gameOver();
      snake.x = GS.gridSize - 1;
    }
  },
  right: () => {
    snake.x++;
    if (snake.x > GS.gridSize - 1) {
      GS.isWallKilling && gameOver();

      snake.x = 0;
    }
  },
  up: () => {
    snake.y--;
    if (snake.y < 0) {
      snake.y = GS.gridSize - 1;
      GS.isWallKilling && gameOver();
    }
  },
  down: () => {
    snake.y++;
    if (snake.y > GS.gridSize - 1) {
      snake.y = 0;
      GS.isWallKilling && gameOver();
    }
  },
  stopped: () => {
    alert("bug");
    console.error("stopped");
  },
};

map[snake.y][snake.x] = snake.lg;

//function pour faire apparaitre le serpent en entier ?

const modifyGrid = (pFunction: (i: number, j: number, num: number) => void) => {
  let i = 0;
  let j = 0;

  map.forEach((line: number[]) => {
    line.forEach((cell) => {
      pFunction(i, j, cell);
      j++;
    });
    j = 0;
    i++;
  });
};

export {
  gameOver,
  map,
  DOM_grid,
  snake,
  modifyGrid,
  GS,
  createApple,
  createBomb,
};
