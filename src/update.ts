import { sDir, sTimerInc } from "./main.js"
import {  map, modifyGrid, snake } from "./load.js"


// let timeGame = 0




map[snake.y][snake.x] = snake.lg


export const update = (dt: number, pTimer:number, pMoving: boolean) => {
  // timeGame += dt





  if (sTimerInc(dt)) {



    // console.log(sTimer%speedSnake ,  sTimer , speedSnake )



    if (pMoving)
    {


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
}