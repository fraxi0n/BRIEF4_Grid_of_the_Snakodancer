import { update } from "./update.js";
import { updateDOM } from "./draw.js";


export let sDir : "left" | "right" | "up" | "down" = "left"



function keyDown (t: { preventDefault: () => void; code: string; })
{
  t.preventDefault();

  //f12 marche??
  if (t.code == "ArrowUp") {sDir = "up"}
  if (t.code == "ArrowDown") { sDir = "down"}
  if (t.code == "ArrowLeft") { sDir = "left"}
  if (t.code == "ArrowRight") { sDir = "right"}

}

let dt : number
let time = Date.now();



function loop() {
  const now = Date.now();
   dt = now - time;

  update(dt);
  updateDOM();

  time = now;
  requestAnimationFrame(loop); 
}

requestAnimationFrame(loop); 
