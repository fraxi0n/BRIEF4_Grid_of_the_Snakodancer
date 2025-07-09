import { sDir, sTimerInc, stopMoving, tempo } from "./main.js";
import { gameOver, map, modifyGrid, snake, createApple, GS } from "./load.js";

// let timeGame = 0
let score = 0;

const checkSnakeCase = () => {
  if (map[snake.y][snake.x] <= 0 && map[snake.y][snake.x] !== -10) {
    if (map[snake.y][snake.x] === -1) {
      snake.lg++;
      score++;
      GS.isAppleRespawn && createApple();
    }
    map[snake.y][snake.x] = snake.lg;
  } else {
    gameOver();
  }
};

export const update = (dt: number) => {
  if (sTimerInc(dt)) {
    if (sDir !== "stopped") {
      modifyGrid((i: number, j: number, cell: number) => {
        if (map[i][j] > 0) {
          map[i][j]--;
        }
      });
      tempo.countFail = 0;

      snake[sDir]();
      checkSnakeCase();
      GS.isTempoRequired && stopMoving(false);
    }
  }
};
