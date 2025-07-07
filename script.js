// === Tutorial Logic ===
const startBtn = document.getElementById("start-button");
const tutorialScreen = document.getElementById("tutorial-screen");
const slides = document.querySelectorAll(".tutorial-slide");
const beginBtn = document.getElementById("begin-game");

let slideIndex = 0;

startBtn.addEventListener("click", () => {
  document.getElementById("home-screen").style.display = "none";
  tutorialScreen.style.display = "block";
  showSlide(slideIndex);
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  if (index < slides.length - 1) {
    setTimeout(() => showSlide(index + 1), 4000);
  }
}

beginBtn.addEventListener("click", () => {
  tutorialScreen.style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  drawMap(); // Start the game!
});

// === Map Logic ===
const board = document.getElementById("game-board");


const mapLayout = [
  ["~", "~", "~", "A1", "A1", "~", "~", "A3", "~", "~"],
  ["~", "~", "A2", "A1", "C", "A1", "A3", "A3", "~", "~"],
  ["~", "A2", "A2", "A2", "C", "C", "A3", "~", "~", "~"],
  ["A2", "A2", "A2", "~", "~", "~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"]
];

function drawMap() {
  const rows = mapLayout.length;
  const cols = mapLayout[0].length;
  board.style.gridTemplateColumns = `repeat(${cols}, 30px)`;

  board.innerHTML = "";

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const type = mapLayout[r][c];
      const tile = document.createElement("div");
      tile.classList.add("tile");

      if (type === "~") {
        tile.classList.add("water");
      } else if (type === "C") {
        tile.classList.add("capital");
      } else {
        tile.classList.add(`land-${type}`);
      }

      board.appendChild(tile);
    }
  }
}

// Optional: End Turn logic
document.getElementById("end-turn").addEventListener("click", () => {
  alert("Turn ended! (Next: Add game logic)");
});


