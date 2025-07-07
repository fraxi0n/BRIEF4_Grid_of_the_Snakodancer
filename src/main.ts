import { update } from "./update.js";
import { updateDOM } from "./draw.js";
import { GS } from "./load.js";

type Direction = "left" | "right" | "up" | "down";

let sDir: Direction = "left";
let isMoving = true;
const moveHistory: Direction[] = ["left"];

const stopMoving = () => {
  isMoving = false;
};

function changeDir(t: KeyboardEvent) {
  if (t.code !== "F12") {
    t.preventDefault();
  }

  if (isTempo) {
    isMoving = true;

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
    return true;
  }
  return false;
};

const runGame = () => {
  GS.run = true;
  GS.soundOn && GS.audio.play();

  GS.audio.currentTime = 10.71 % (115 / 60); //callage du rhtme sur la musique

  GS.audio.volume = 0.5;

  requestAnimationFrame(loop);
};

if (GS.run) {
  runGame();
}

function loop() {
  const now = Date.now();
  dt = now - time;

  update(dt, sTimer, isMoving);
  updateDOM(sTimer, isTempo);

  time = now;
  requestAnimationFrame(loop);
}

export { sTimerInc, sDir };
