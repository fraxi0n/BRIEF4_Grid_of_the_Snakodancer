const gridSize = 5


const DOM_grid: HTMLElement | null= document.getElementById("grid")


if (DOM_grid) {
  DOM_grid.style.gridTemplateColumns = `repeat(${gridSize}, 0fr)`;
  DOM_grid.style.gridTemplateRows = `repeat(${gridSize}, 0fr)`;
}

const map: number[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(0)
);


const gameOver = () => {
      // alert("GAME OVER press F5" )
} 

const apple  = { x: 0 , y: 0 } 


const createApple = () =>  {

 do {
  apple.x =  Math.floor( Math.random()*gridSize)
  apple.y =  Math.floor( Math.random()*gridSize)
}
  while (map[apple.x][apple.y]!==0 )

  map[apple.x][apple.y] = -1

}

createApple()



const snake = {
  x: gridSize-1, y: 0,
  lg: 10,

  left: () => {
    snake.x--
    if (snake.x < 0) {
      gameOver()
      snake.x = gridSize-1
    }
  }
  ,
  right: () => {
    snake.x++
    if (snake.x > gridSize-1) {
      gameOver()

      snake.x = 0
    }
  },
  up: () => {
    snake.y--
    if (snake.y < 0) {
      snake.y = gridSize-1
      gameOver()

    }
  },
  down: () => {
    snake.y++
    if (snake.y > gridSize - 1 ) {
      snake.y = 0
      gameOver()
    }
  }

}


map[snake.y][snake.x] = snake.lg


const modifyGrid = ( pFunction :( i : number , j:number, num : number )=> void ) => {
    let i = 0
    let j = 0

    map.forEach((line: number[]) => {
        line.forEach(cell => {
            pFunction(i,j , cell)
            j++
        });
        j = 0
        i++

    });

}


export {gameOver, map , DOM_grid, snake ,modifyGrid , gridSize , createApple}