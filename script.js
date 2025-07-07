const board = document.getElementById("game-board");

// Example custom map — adapt based on your drawing
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
