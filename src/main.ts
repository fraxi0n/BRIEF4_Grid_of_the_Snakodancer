import { update } from "./update.js";
import { updateDOM } from "./draw.js";
import { audio, createBomb, GS } from "./load.js";

type Direction = "left" | "right" | "up" | "down" | "stopped";

let sDir: Direction = "stopped";

let sDerDir: Direction = "left";
const sHistoryDir : Direction[] = ["left"]

const setDir = (pDirection: Direction) => {
  sDir = pDirection;
  if (pDirection !== "stopped") {
    sDerDir = pDirection;
    // console.log (sHistoryDir , sDerDir  , sDir)
  }
};

class Tempo {
  isActive: boolean = true;
  isTooSoon: boolean = false;
  private isTooLate: boolean = true;
  countFail = 0;
  countAll = 0

  get_isTooLate() {
    return this.isTooLate;
  }

  set_isTooLate(pIsTooLate: boolean) {
    if (pIsTooLate == true && this.isTooLate == false) {
      createBomb();
    }
    this.isTooLate = pIsTooLate;
  }
}

const tempo = new Tempo();

// export let tempo.activeFailed = false;
// const moveHistory: Direction[] = ["left"]; // todo

const stopMoving = (isFailed: boolean) => {
  if (isFailed) {
    GS.isOutTempoBomb&&tempo.countFail++;
    if (tempo.countFail >= GS.countFailBomb) {
      createBomb();
    }
  }
  setDir("stopped");
};

function toucheDir(t: KeyboardEvent) {

  if (t.code !== "F12") {
    t.preventDefault();
  }

  if (!releaseKeyCheck) {
    if (tempo.isActive && !tempo.isTooSoon) {
      if (t.code == "ArrowUp") {
        sDerDir == "down" ? stopMoving(true) : setDir("up");
      }
      if (t.code == "ArrowDown") {
        sDerDir == "up" ? stopMoving(true) : setDir("down");
      }
      if (t.code == "ArrowLeft") {
        sDerDir == "right" ? stopMoving(true) : setDir("left");
      }
      if (t.code == "ArrowRight") {
        sDerDir == "left" ? stopMoving(true) : setDir("right");
      }
    } else {
      stopMoving(!tempo.isTooSoon);
      tempo.isTooSoon = true;
    }
    if (!GS.run) {
      runGame();
    }

    releaseKeyCheck = t.code;
  }
}
let releaseKeyCheck: string | false = false;
document.addEventListener("keydown", toucheDir);
document.addEventListener("keyup", (t: KeyboardEvent) => {
  if (t.code == releaseKeyCheck) {
    releaseKeyCheck = false;
  }
});

let dt: number;
let time = Date.now();
let sTimer = 0;

const sTimerInc = (incValue: number) => {
  sTimer += incValue;

  if (sTimer > GS.speedSnake * (1 - GS.tempoSnake)) {
    !tempo.isActive&&tempo.countAll ++

    tempo.isActive = true;
  }

  if (sTimer > GS.speedSnake) {
    sTimer = sTimer % GS.speedSnake;
    tempo.isActive = false;
    tempo.isTooSoon = false;

    if (sDir === "stopped") {
      tempo.set_isTooLate(true);
    } else {
    sHistoryDir.push(sDir)

      tempo.set_isTooLate(false);
    }

    return true;
  }
  return false;
};

const runGame = () => {
  GS.run = true;
  GS.soundOn && audio[GS.bpm].play();

  audio[GS.bpm].currentTime = 10.71 % (115 / 60); //callage du rhytme sur la musique

  audio[GS.bpm].volume = 0.5;

  requestAnimationFrame(loop);
};

if (GS.run) {
  runGame();
}

function loop() {
  const now = Date.now();
  dt = now - time;

  update(dt);
  updateDOM(sTimer, tempo.isActive);
  time = now;
  requestAnimationFrame(loop);
}

export { sTimerInc,  stopMoving, tempo ,sHistoryDir,sDir,sDerDir, Direction};
