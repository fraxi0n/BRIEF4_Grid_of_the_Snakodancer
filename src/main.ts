import { update } from "./update.js";
import { updateDOM } from "./draw.js";

type Direction = "left" | "right" | "up" | "down";

export let sDir: Direction = "left";
export let isMoving = true;
export const moveHistory: Direction[] = ["left"];

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

    if (t.code == "ArrowDown") {
      sDir = "down";
    }
    if (t.code == "ArrowLeft") {
      sDir = "left";
    }
    if (t.code == "ArrowRight") {
      sDir = "right";
    }
  } else {
    stopMoving();
  }
}
document.addEventListener("keydown", changeDir);

let dt: number;
let time = Date.now();
const speedSnake = 200;
const tempoSnake = 0.95; //marge d'erreur
export const windowSize = 500;

let isTempo = false;

let sTimer = 0;
export const sTimerInc = (incValue: number) => {
  sTimer += incValue;

  if (sTimer > speedSnake * (1 - tempoSnake)) {
    isTempo = true;
  }

  if (sTimer > speedSnake) {
    sTimer = sTimer % speedSnake;
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
