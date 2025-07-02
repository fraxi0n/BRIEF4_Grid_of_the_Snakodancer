import { update } from "./update.js";
import { updateDOM } from "./draw.js";



let keyUp = false
let keyDown = false
let keyRight = false
let keyLeft = false


function KeyUp (t: { preventDefault: () => void; code: string; })
{
  t.preventDefault();
  if (t.code == "ArrowUp") { keyUp= false}
  if (t.code == "ArrowDown") { keyDown= false}
  if (t.code == "ArrowLeft") { keyLeft= false}
  if (t.code == "ArrowRight") { keyRight= false}

}

let dt : number
let time = Date.now();


export var map : number[][] = []
const line = [0,0,0,0,0,0,0,0,0,0]

for (let i = 0 ; i<10 ; i++)
{
  map.push( line)
}

map[5][5]= 1

console.log(map)




function loop() {
  const now = Date.now();
   dt = now - time;

  update(dt);
  updateDOM();

  time = now;
  requestAnimationFrame(loop); 
}

requestAnimationFrame(loop); 
