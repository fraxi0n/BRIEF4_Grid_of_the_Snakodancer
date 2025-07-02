// import { map } from "./main.js";


export const map: number[][] = Array.from({ length: 10 }, () =>
    Array(10).fill(0)
);


const grid = document.getElementById("grid")


const fillGrid = () => {
    let i = 0
    let j = 0
    console.log(map)

    map.forEach((line: number[]) => {


        line.forEach(cell => {
            const newCell: HTMLElement = document.createElement("div");
            newCell.id = `l${i}_c${j}`
            newCell.classList.add("cell")
            grid?.appendChild(newCell)
            j++
        });
        j = 0
        i++

    });

}

fillGrid()
const tete: HTMLImageElement = document.createElement("img");
tete.src = "img/snakesprites/png/snake_1.png"

document.getElementById(`l1_c3`)?.appendChild(tete)


export const updateDOM = () => {

    for (let line = 0; line < 10; line++) {
        for (let column = 0; column < 10; column++) {
            const cell = document.getElementById(`l${line}_c${column}`)
            cell && (cell.innerHTML = '');

            if (map && map[line][column]) {

                if (map[line][column] === 1) {


                    // console.log(" " + line + "    " + column)
                    const tete: HTMLImageElement = document.createElement("img");
                    tete.src = "img/snakesprites/png/snake_1.png"
                    tete.classList.add("cell")

                    cell?.appendChild(tete)
                }
            }

        }

    }


}

