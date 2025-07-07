
// === Start Button Logic ===
document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("home-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  drawMap();
});

// === Map Setup ===
const board = document.getElementById("game-board");

const mapLayout = [
  ["~", "~", "~", "~", "A", "A", "A", "~", "~", "~", "~", "~", "~"],
  ["~", "~", "~", "A", "A", "C", "A", "A", "~", "~", "~", "~", "~"],
  ["~", "~", "B", "B", "A", "A", "A", "A", "C", "~", "~", "~", "~"],
  ["~", "B", "B", "B", "~", "~", "D", "D", "D", "D", "~", "~", "~"],
  ["B", "B", "B", "~", "~", "~", "~", "D", "D", "D", "~", "~", "~"],
  ["~", "~", "~", "~", "~", "~", "~", "~", "D", "D", "~", "~", "~"],
  ["~", "~", "~", "~", "~", "E", "E", "E", "~", "~", "~", "~", "~"],
  ["~", "~", "~", "~", "E", "E", "C", "E", "~", "~", "~", "~", "~"],
  ["~", "~", "~", "E", "E", "E", "E", "~", "~", "~", "~", "~", "~"]
];

const tileClasses = {
  "~": "water",
  "A": "land-A",
  "B": "land-B",
  "C": "capital",
  "D": "land-D",
  "E": "land-E"
};

function drawMap() {
  const rows = mapLayout.length;
  const cols = mapLayout[0].length;
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${cols}, 30px)`;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const type = mapLayout[r][c];
      const tile = document.createElement("div");
      tile.classList.add("tile", tileClasses[type] || "unknown");
      board.appendChild(tile);
    }
  }
}

// === Optional: End Turn Button ===
document.getElementById("end-turn").addEventListener("click", () => {
  alert("Turn ended — game logic coming soon!");
});
