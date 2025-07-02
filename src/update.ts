import { map } from "./draw.js"
import { sDir } from "./main.js"

let timeGame = 0

const speedSnake = 2000

let sTimer = 0


const snake = {
  x: 9, y: 5,
  lg: 1,

  left: () => {
    snake.x--
    if (snake.x < 0) {
      snake.x = 9
    }
  }
  ,
  right: () => {
    snake.x--
    if (snake.x < 0) {
      snake.x = 9
    }
  },
  up: () => {
    snake.x--
    if (snake.x < 0) {
      snake.x = 9
    }
  },
  down: () => {
    snake.x--
    if (snake.x < 0) {
      snake.x = 9
    }
  }

}



map[snake.y][snake.x] = snake.lg


export const update = (dt: number) => {
  timeGame += dt


  sTimer += dt
  if (sTimer >= speedSnake) {
    sTimer -= speedSnake

    snake[sDir]()

    map[snake.y][snake.x] = snake.lg

  }

  //   console.log(dt, timeGame)



}