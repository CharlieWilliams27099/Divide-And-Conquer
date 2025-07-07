document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("home-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
});

const board = document.getElementById("game-board");


const mapLayout = [
  ["~", "~", "~", "A1", "A1", "~", "~", "A3", "~", "~"],
  ["~", "~", "A2", "A1", "C", "A1", "A3", "A3", "~", "~"],
  ["~", "A2", "A2", "A2", "C", "C", "A3", "~", "~", "~"],
  ["A2", "A2", "A2", "~", "~", "~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "~", "~", "~", "~", "~", "~"]
];

const rows = mapLayout.length;
const cols = mapLayout[0].length;

function drawMap() {
  board.style.gridTemplateColumns = `repeat(${cols}, 30px)`;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cellType = mapLayout[r][c];
      const tile = document.createElement("div");
      tile.classList.add("tile");

      if (cellType === "~") {
        tile.classList.add("water");
      } else if (cellType === "C") {
        tile.classList.add("capital");
      } else {
        tile.classList.add(`land-${cellType}`);
      }

      board.appendChild(tile);
    }
  }
}

drawMap();
const slides = document.querySelectorAll(".tutorial-slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  if (index < slides.length - 1) {
    setTimeout(() => showSlide(index + 1), 4000); // 4 seconds per slide
  }
}

showSlide(0);

document.getElementById("begin-game").addEventListener("click", () => {
  document.getElementById("tutorial-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
});

