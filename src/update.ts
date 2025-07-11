import {
  sDir,
  sTimerInc,
  stopMoving,
  tempo,
} from "./main.js";
import { gameOver, map, modifyGrid, snake, createApple, GS } from "./load.js";
import { getStyleBody } from "./draw.js";

// let timeGame = 0
let score = 0;
let styleSnake: number[] = [];

export const update = (dt: number) => {
  if (sTimerInc(dt)) {
    if (sDir !== "stopped") {
      tempo.countFail = 0;

    getStyleBody()

      snake[sDir]();

      if (map[snake.y][snake.x] <= 1 && map[snake.y][snake.x] !== -10) {
        if (map[snake.y][snake.x] === -1) {
          snake.lg++;
          score++;
          GS.isAppleRespawn && createApple();
        } else {
          modifyGrid((i: number, j: number, cell: number) => {
            if (map[i][j] > 0) {
              map[i][j]--;
            }
          });
        }

        map[snake.y][snake.x] = snake.lg;
      } else {
        gameOver();
      }
      GS.isTempoRequired && stopMoving(false);
    }
  }
};
