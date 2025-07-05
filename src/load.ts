const GS = {
  //GAME STATS

  windowSize: 500, //todo
  isGOD: false,

  gridSize: 8,
  isWallKilling: true,

  nbApple: 3,
  isAppleRespawn: true,
  speedSnake: 600,
  tempoSnake: 0.9, //marge d'erreur implémenté style dans la div todo

  //valeur de départ peu d'importance
  snakeLg: 1,
  snakeOX: 9, //not use
  snakeOY: 2, // not use
};

const map: number[][] = Array.from({ length: GS.gridSize }, () =>
  Array(GS.gridSize).fill(0)
);

const DOM_grid: HTMLElement | null = document.getElementById("grid");

if (DOM_grid) {
  DOM_grid.style.gridTemplateColumns = `repeat(${GS.gridSize}, 0fr)`;
  DOM_grid.style.gridTemplateRows = `repeat(${GS.gridSize}, 0fr)`;
}

const apple = { x: 0, y: 0 };

const createApple = () => {
  do {
    apple.x = Math.floor(Math.random() * GS.gridSize);
    apple.y = Math.floor(Math.random() * GS.gridSize);
  } while (map[apple.x][apple.y] !== 0);

  map[apple.x][apple.y] = -1;
};

for (let i = 1; i <= GS.nbApple; i++) {
  createApple();
}

const gameOver = () => {
  !GS.isGOD && alert("GAME OVER press F5");
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

export { gameOver, map, DOM_grid, snake, modifyGrid, GS, createApple };
