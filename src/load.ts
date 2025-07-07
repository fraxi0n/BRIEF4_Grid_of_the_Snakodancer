const GS = {
  //GAME STATS

  windowSize: 500, //todo
  soundOn: false,
  audio : new Audio("music/1-1.mp3"),

  isGOD: false, // todo real death screen

  isWallKilling: false,
  gridSize: 5,

  nbApple: 10,
  isAppleRespawn: false,


  speedSnake: 1000/(115/60) , //115 = bpm NE PAS CHANGER
  tempoSnake: 0.6,

  isTempoRequired: true,
  moveHistory : false , // todo
  isOutTempoBomb : false, // todo

  //valeur de départ peu d'importance
  snakeLg: 2,
  snakeOX: 9, //not use
  snakeOY: 2, // not use

  run : false // true = run des le launch
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

  if (!GS.isGOD )
  {
    GS.audio.pause()
    

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
    alert("bug")
    console.error( "stopped" );
  }
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
