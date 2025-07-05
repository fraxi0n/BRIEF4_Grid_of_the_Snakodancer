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

function loop() {
  const now = Date.now();
  dt = now - time;

  update(dt, sTimer, isMoving);
  updateDOM(sTimer, isTempo);

  time = now;
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

export { sTimerInc, sDir };
