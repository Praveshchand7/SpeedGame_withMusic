const startButton = document.querySelector("#start");
const endButton = document.querySelector("#stop");
const overlay = document.querySelector("#overlay");
const closeButton = document.querySelector("#close");
const circles = document.querySelectorAll(".circle"); // return node list
const scoreText = document.querySelector("#score");
const resultText = document.querySelector("#result");

let active = 0;
let score = 0;
let pace = 1000;
let rounds = 0;
let timer;

const getRndInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => {
    clickedCircle(i);
  });
});

const clickedCircle = (i) => {
  if (i != active) {
    endGame();
  } else {
    score++;
    rounds--;
    scoreText.textContent = score;
  }
};

const startGame = () => {
  startButton.style.display = "none";
  endButton.style.display = "inline";

  for (let i = 0; i < circles.length; i++) {
    circles[i].style.pointerEvents = "auto";
  }
  let nextActive = pickNew(active);

  circles[nextActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = nextActive;
  timer = setTimeout(startGame, pace);
  pace = pace - 10;

  if (rounds >= 5) {
    endGame();
  }

  rounds++;

  function pickNew(active) {
    let nextActive = getRndInt(0, 3);

    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNew(active);
    }
  }
};

const endGame = () => {
  clearTimeout(timer);
  overlay.style.visibility = "visible";

  if (score == 0) {
    resultText.textContent = `Your score is ${score}. Oh come on, you can do better than this!`;
  } else if (score > 1 || score < 10) {
    resultText.textContent = `Your score is ${score}, not bad, You can do better`;
  } else if (score > 11) {
    resultText.textContent = `Your score is ${score}, now we are talking!`;
  }
};

const reloadGame = () => {
  window.location.reload();
};
startButton.addEventListener("click", () => {
  startGame();
  startGameMusic();
});

endButton.addEventListener("click", () => {
  endGame();
  endGameMusic();
});
closeButton.addEventListener("click", reloadGame);

// sounds for the game......
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

const startGameMusic = () => {
  startSound = new sound("spider.mp3");
  startSound.play();
};

const endGameMusic = () => {
  endSound = new sound("bgm_01.mp3");
  startSound.stop();
  endSound.play();
};
