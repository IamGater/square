const $start = document.querySelector("#start");
const $game = document.querySelector("#game");
const $time = document.querySelector("#time");
const $result = document.querySelector("#result");
const $timeHeader = document.querySelector("#time-header");
const $resultHeader = document.querySelector("#result-header");

let score = 0;
let isGameStarted = false;

$start.addEventListener("click", startGame);
$game.addEventListener("click", handleBoxClick);

function startGame() {
  score = 0;
  setGameTime();
  $timeHeader.classList.remove("hide");
  $resultHeader.classList.add("hide");
  isGameStarted = true;
  $game.classList.add("active");
  $start.classList.add("hide");
  
  const interval = setInterval(() => {
    const time = parseFloat($time.textContent);

    if (time <= 0) {
      clearInterval(interval);
      endGame();
    } else {
      $time.textContent = (time - 0.1).toFixed(1);
    }
  }, 100);
  renderBox();
}

function setGameScore() {
  $result.textContent = score.toString();
}
function setGameTime() {
  let time = 5;
  $time.textContent = time.toFixed(1);
}

function endGame() {
  isGameStarted = false;
  setGameScore();
  $start.classList.remove("hide");
  $game.innerHTML = "";
  $game.style.backgroundColor = "#ccc";
  $timeHeader.classList.add("hide");
  $resultHeader.classList.remove("hide");
}

function handleBoxClick(e) {
  if (!isGameStarted) {
    return;
  }
  if (e.target.dataset.box) {
    score++;
    renderBox();
  }
}

function renderBox() {
  $game.innerHTML = "";
  const box = document.createElement("div");
  const boxSize = getRandom(30, 100);
  const gameSize = $game.getBoundingClientRect();
  const maxTop = gameSize.height - boxSize;
  const maxLeft = gameSize.width - boxSize;

  box.style.height = box.style.width = boxSize + "px";
  box.style.position = "absolute";
  box.style.backgroundColor = "#000";
  box.style.top = getRandom(0, maxTop) + "px";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.cursor = "pointer";
  box.setAttribute("data-box", "true");

  $game.insertAdjacentElement("afterbegin", box);
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
