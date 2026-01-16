/* =====================================
   HEART HUNT GAME (MINESWEEPER STYLE)
====================================== */

const grid = document.getElementById("ticGrid");
const dogReveal = document.getElementById("dog-reveal");
const dogImage = document.getElementById("dogImage");
const afterDogBtn = document.getElementById("afterDogBtn");

/* DOG IMAGES */
const dogPics = [
  "assets/dogpics/dog1.jpg",
  "assets/dogpics/dog2.jpg",
  "assets/dogpics/dog3.jpg"
];

let heartIndex = Math.floor(Math.random() * 9);
let gameWon = false;
let slideshowInterval = null;

/* =====================================
   INIT HEART GRID
====================================== */
if (grid) {
  grid.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "tic-cell";
    cell.dataset.index = i;

    cell.addEventListener("click", () => handleCellClick(cell));
    grid.appendChild(cell);
  }
}

/* =====================================
   HANDLE CELL CLICK
====================================== */
function handleCellClick(cell) {
  if (gameWon) return;
  if (cell.textContent !== "") return;

  const index = Number(cell.dataset.index);

  if (index === heartIndex) {
    cell.textContent = "💖";
    winGame();
  } else {
    cell.textContent = "✨";
    cell.style.opacity = "0.6";
  }
}

/* =====================================
   WIN STATE
====================================== */
function winGame() {
  gameWon = true;

  setTimeout(() => {
    startDogSlideshow();
    dogReveal.classList.remove("hidden");
    afterDogBtn.classList.remove("hidden");
  }, 600);
}

/* =====================================
   DOG SLIDESHOW
====================================== */
function startDogSlideshow() {
  let current = 0;
  dogImage.src = dogPics[current];

  slideshowInterval = setInterval(() => {
    current = (current + 1) % dogPics.length;
    dogImage.style.opacity = "0";

    setTimeout(() => {
      dogImage.src = dogPics[current];
      dogImage.style.opacity = "1";
    }, 300);
  }, 2500);
}

/* =====================================
   CAKE CUT (UNCHANGED & SAFE)
====================================== */

const cakeImg = document.getElementById("cakeImage");
const afterCakeBtn = document.getElementById("afterCakeBtn");
let cakeCut = false;

function cutCake() {
  if (cakeCut) return;

  cakeCut = true;

  cakeImg.src = "assets/icons/cakecut.png";
  cakeImg.classList.add("cake-cut");

  const chime = new Audio("assets/soundeffects/chime.wav");
  chime.volume = 0.6;
  chime.play().catch(() => {});

  afterCakeBtn.classList.remove("hidden");
}
