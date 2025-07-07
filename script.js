document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("home-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  drawMap();
});

const board = document.getElementById("game-board");

const mapLayout = Array(20).fill().map((_, r) =>
  Array(30).fill().map((_, c) => {
    if (r === 0 || r === 19 || c === 0 || c === 29) return "~";
    if (r + c < 10) return "A";
    if (r > 14 && c < 10) return "B";
    if (r > 4 && r < 10 && c > 18) return "D";
    if (r > 12 && r < 16 && c > 20) return "E";
    return "~";
  })
);

// Drop in capitals
mapLayout[5][5] = "K";   // Capital A
mapLayout[16][5] = "K";  // Capital B
mapLayout[7][25] = "K";  // Capital D
mapLayout[14][25] = "K"; // Capital E

const tileClasses = {
  "~": "water",
  "A": "land-A",
  "B": "land-B",
  "D": "land-D",
  "E": "land-E",
  "K": "capital"
};

function drawMap() {
  const rows = mapLayout.length;
  const cols = mapLayout[0].length;
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${cols}, 20px)`;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const type = mapLayout[r][c];
      const tile = document.createElement("div");
      tile.classList.add("tile", tileClasses[type] || "unknown");
      board.appendChild(tile);
    }
  }
}

document.getElementById("end-turn").addEventListener("click", () => {
  alert("Turn ended. Awaiting your next command, Commander.");
});
