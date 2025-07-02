const test: string = "Hello World";

let number : number

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

let timeGame = 0 

const  update  = (dt: number) =>  {
  timeGame+=dt




  console.log(dt, timeGame)
}

const  draw = () =>{
}

function loop() {
  const now = Date.now();
   dt = now - time;

  update(dt);
  draw();

  time = now;
  requestAnimationFrame(loop); 
}

requestAnimationFrame(loop); 
