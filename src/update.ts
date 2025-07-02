import { map, modifyGrid } from "./draw.js"
import { sDir } from "./main.js"

let timeGame = 0

const speedSnake = 200

let sTimer = 0


export const snake = {
  x: 9, y: 5,
  lg: 5,

  left: () => {
    snake.x--
    if (snake.x < 0) {
      snake.x = 9
    }
  }
  ,
  right: () => {
    snake.x++
    if (snake.x > 9) {
      snake.x = 0
    }
  },
  up: () => {
    snake.y--
    if (snake.y < 0) {
      snake.y = 9
    }
  },
  down: () => {
    snake.y++
    if (snake.y > 9) {
      snake.y = 0
    }
  }

}



map[snake.y][snake.x] = snake.lg


export const update = (dt: number) => {
  timeGame += dt


  sTimer += dt
  if (sTimer >= speedSnake) {
    sTimer -= speedSnake

    modifyGrid(
      (i: number, j: number, cell: number)=>{
        if ( map[i][j] >0)
        {
           map[i][j] --
        }
      }
    )

    snake[sDir]()

    map[snake.y][snake.x] = snake.lg

  }




}