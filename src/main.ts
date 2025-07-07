import { update } from "./update.js";
import { updateDOM } from "./draw.js";
import { GS } from "./load.js";

type Direction = "left" | "right" | "up" | "down" |"stopped";

let sDir: Direction = "stopped";
let tempoFailed = false
// const moveHistory: Direction[] = ["left"]; // todo

const stopMoving = () => {
  sDir="stopped"
};

function changeDir(t: KeyboardEvent) {
  if (t.code !== "F12") {
    t.preventDefault();
  }

  if (isTempo && !tempoFailed) {

    if (t.code == "ArrowUp") {
      sDir == "down" ? stopMoving() : (sDir = "up");
    }
    if (t.code == "ArrowDown") {
      sDir == "up" ? stopMoving() : (sDir = "down");
    }
    if (t.code == "ArrowLeft") {
      sDir == "right" ? stopMoving() : (sDir = "left");
    }
    if (t.code == "ArrowRight") {
      sDir == "left" ? stopMoving() : (sDir = "right");
    }
  } else {
    stopMoving();
    tempoFailed = true 
  }
  if (!GS.run) {
    runGame();
  }
}
document.addEventListener("keydown", changeDir);

let dt: number;
let time = Date.now();

let isTempo = false;

let sTimer = 0;
const sTimerInc = (incValue: number) => {
  sTimer += incValue;

  if (sTimer > GS.speedSnake * (1 - GS.tempoSnake)) {
    isTempo = true;
  }

  if (sTimer > GS.speedSnake) {
    sTimer = sTimer % GS.speedSnake;
    isTempo = false;
    tempoFailed=false
    return true;
  }
  return false;
};

const runGame = () => {
  GS.run = true;
  GS.soundOn && GS.audio.play();

  GS.audio.currentTime = 10.71 % (115 / 60); //callage du rhytme sur la musique

  GS.audio.volume = 0.5;

  requestAnimationFrame(loop);
};

if (GS.run) {
  runGame();
}

function loop() {
  const now = Date.now();
  dt = now - time;

  update(dt);
  updateDOM(sTimer, isTempo);

  time = now;
  requestAnimationFrame(loop);
}

export { sTimerInc, sDir , stopMoving };
