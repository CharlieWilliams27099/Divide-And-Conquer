document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("home-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";
  drawMap();
});

const board = document.getElementById("game-board");

const mapLayout = [
  ["~","~","~","~","~","~","~","A","A","A","A","~","~","~","~","D","D","D","~","~"],
  ["~","~","~","~","A","A","A","A","K","A","A","A","~","~","D","D","D","D","~","~"],
  ["~","~","~","A","A","K","A","A","A","A","A","A","~","D","D","D","~","~","~","~"],
  ["~","~","~","B","B","B","A","A","A","A","A","~","D","D","~","~","~","~","~","~"],
  ["~","~","B","B","B","B","B","A","A","A","~","~","~","~","~","~","~","~","~","~"],
  ["~","B","B","B","~","~","~","~","~","~","~","~","~","~","~","~","~","~","~","~"],
  ["B","B","~","~","~","~","~","~","~","E","E","E","~","~","~","~","~","~","~","~"],
  ["B","~","~","~","~","~","~","E","E","K","E","E","E","~","~","~","~","~","~","~"],
  ["~","~","~","~","~","E","E","E","E","E","E","E","~","~","~","~","~","~","~","~"],
  ["~","~","~","~","E","E","E","~","~","~","~","~","~","~","~","~","~","~","~","~"],
  ["~","~","~","~","~","~","~","~","~","~","~","~","~","~","~","~","~","~","~","~"],
  ["~","~","~","~","~","~","~","~","~","~","~","~","~","~","~","~","~","~","~","~"]
];

const tileClasses = {
  "~": "water",
  "A": "land-A",
  "B": "land-B",
  "K": "capital",
  "D": "land-D",
  "E": "land-E"
};

function drawMap() {
  const rows = mapLayout.length;
  const cols = mapLayout[0].length;
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${cols}, 30px)`;

  for (let r = 0; r < rows; r++) {
    if (mapLayout[r].length !== cols) {
      console.error(`Row ${r} is not ${cols} tiles wide`);
      continue;
    }

    for (let c = 0; c < cols; c++) {
      const type = mapLayout[r][c];
      const tile = document.createElement("div");
      tile.classList.add("tile", tileClasses[type] || "unknown");
      board.appendChild(tile);
    }
  }
}

document.getElementById("end-turn").addEventListener("click", () => {
  alert("Turn ended — now it’s someone else’s move!");
});
