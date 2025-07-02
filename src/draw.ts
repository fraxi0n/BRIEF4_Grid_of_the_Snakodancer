import { map } from "./main.js";


const grid = document.getElementById("grid")


const fillGrid = () => {
    let i = 0
    let j = 0

    map.forEach((line: number[]) => {
        

        line.forEach(cell => {
            const newCell: HTMLElement = document.createElement("div");
            newCell.id = `l${i}_c${j} `
            newCell.classList.add("cell")
            grid?.appendChild(newCell)
            j++
        });
        j=0
        i++

    });

}

fillGrid()



export const updateDOM = () => {
}

