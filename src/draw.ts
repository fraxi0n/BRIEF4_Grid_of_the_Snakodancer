// import { map } from "./main.js";

import {  snake } from "./update.js";
import { gridSize ,DOM_grid } from "./load.js"


export const map: number[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(0)
);


// const DOM_grid = document.getElementById("DOM_grid")



export const modifyGrid = (    pFunction :( i : number , j:number, num : number )=> void ) => {
    let i = 0
    let j = 0
    console.log(map)

    map.forEach((line: number[]) => {
        line.forEach(cell => {
            pFunction(i,j , cell)
            j++
        });
        j = 0
        i++

    });

}


const fillGrid : (i: number, j: number, cell: number) => void  = (i:number,j:number,cell:number) => {
                const newCell: HTMLElement = document.createElement("div");
            newCell.id = `l${i}_c${j}`
            newCell.classList.add("cell")
            DOM_grid?.appendChild(newCell)

}


modifyGrid(fillGrid)

const tete: HTMLImageElement = document.createElement("img");
tete.src = "img/snakesprites/png/snake_1.png"

document.getElementById(`l1_c3`)?.appendChild(tete)


export const updateDOM = () => {

    for (let line = 0; line < gridSize; line++) {
        for (let column = 0; column < gridSize; column++) {
            const cell = document.getElementById(`l${line}_c${column}`)
            
            if(cell !== null)
            {
            cell.innerText = "test"
            cell.innerHTML = ''
            }

            if (map && map[line][column]) {

                if (map[line][column] === snake.lg) {

                    const tete: HTMLImageElement = document.createElement("img");
                    tete.src = "img/snakesprites/png/snake_1.png"
                    tete.classList.add("cell")
                    cell?.appendChild(tete)
                }
                else if (map[line][column] > 0  )
                {
                    
                    const queue: HTMLImageElement = document.createElement("img");
                    queue.src = "img/snakesprites/png/corps.png"
                    queue.classList.add("cell")
                    cell?.appendChild(queue)

                }
            }

        }

    }


}

