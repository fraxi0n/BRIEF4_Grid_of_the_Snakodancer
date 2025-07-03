import { update } from "./update.js";
import { updateDOM } from "./draw.js";


export let sDir : "left" | "right" | "up" | "down" = "left"

export let isMoving = true


const stopMoving = ()=>
{
  isMoving = false 
}



function changeDir (t: KeyboardEvent)
{

  if (t.code!== "F12")
  {
  t.preventDefault();
  }

  if (t.code == "ArrowUp" ) {   sDir=="down"? stopMoving() :sDir = "up" }
  if (t.code == "ArrowDown" ) {   sDir=="up"? stopMoving() :sDir = "down" }
  if (t.code == "ArrowLeft" ) {   sDir=="right"? stopMoving() :sDir = "left" }
  if (t.code == "ArrowRight" ) {   sDir=="left"? stopMoving() :sDir = "right" }

  if (t.code == "ArrowDown") { sDir = 
    "down"}
  if (t.code == "ArrowLeft") { sDir = 
    "left"}
  if (t.code == "ArrowRight") { sDir = 
    "right"}

}
document.addEventListener("keydown" ,changeDir)

let dt : number
let time = Date.now();
const speedSnake = 500

let sTimer = 0
export const sTimerInc = (incValue: number) => {
  sTimer += incValue

  if (sTimer > speedSnake  )
  {
    sTimer = sTimer%speedSnake
    return true
  }
  return false
} 


function loop() {
  const now = Date.now();
  dt = now - time;

  update(dt,sTimer, isMoving);
  updateDOM(sTimer);


  time = now;
  requestAnimationFrame(loop); 
}

requestAnimationFrame(loop); 
