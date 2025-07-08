document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const endTurn = document.getElementById("end-turn");
  const fortifyBtn = document.getElementById("fortify");
  const startGameBtn = document.getElementById("start-game");
  const player1Type = document.getElementById("player1-type");
  const player2Type = document.getElementById("player2-type");
  const setupScreen = document.getElementById("setup-screen");
  const gameUI = document.getElementById("game-ui");

  const cols = 10, rows = 10, total = rows * cols;
  let tiles = [], control = {1: "ai", 2: "ai"};
  let currentPlayer = 1, phase = "capital", capitalCount = 0;
  let selectedTile = null, fortifySource = null, hasFortified = false;
  let troopsToPlace = 3;

  startGameBtn.addEventListener("click", () => {
    control[1] = player1Type.value;
    control[2] = player2Type.value;
    setupScreen.style.display = "none";
    gameUI.style.display = "block";
    initGame();
  });

  function initGame() {
    board.innerHTML = "";
    tiles = [];
    for (let i = 0; i < total; i++) {
      const tile = document.createElement("div");
      tile.className = "tile";
      tile.dataset.index = i;
      tile.dataset.owner = "0";
      tile.dataset.troops = "0";
      tile.addEventListener("click", () => handleClick(tile));
      tiles.push(tile);
      board.appendChild(tile);
    }
    updateUI();
  }

  function updateUI() {
    tiles.forEach(tile => {
      const owner = tile.dataset.owner;
      tile.className = "tile";
      if (owner === "1") tile.classList.add("p1");
      if (owner === "2") tile.classList.add("p2");
      if (tile.classList.contains("capital")) tile.classList.add("capital");
      tile.textContent = tile.dataset.troops;
      tile.style.outline = "none";
    });
    endTurn.disabled = phase === "capital" || (phase === "reinforce" && troopsToPlace > 0);
    fortifyBtn.style.display = (phase === "attack" && !hasFortified && control[currentPlayer] === "human")
      ? "inline-block" : "none";
    if (control[currentPlayer] === "ai") setTimeout(aiTurn, 400);
  }

  function handleClick(tile) {
    if (control[currentPlayer] !== "human") return;
    const owner = parseInt(tile.dataset.owner);
    const troops = parseInt(tile.dataset.troops);
    if (phase === "capital" && owner === 0) {
      claimCapital(tile);
    } else if (phase === "reinforce" && owner === currentPlayer && troopsToPlace > 0) {
      tile.dataset.troops = (troops + 1).toString();
      troopsToPlace--;
      if (troopsToPlace === 0) {
        phase = "attack";
        updateUI();
      }
    } else if (phase === "attack") {
      if (!selectedTile && owner === currentPlayer && troops > 1) {
        selectedTile = tile;
        tile.style.outline = "2px solid yellow";
      } else if (selectedTile && tile !== selectedTile) {
        attemptAttack(selectedTile, tile);
        selectedTile.style.outline = "none";
        selectedTile = null;
      }
    } else if (phase === "fortify") {
      if (!fortifySource && owner === currentPlayer && troops > 1) {
        fortifySource = tile;
        tile.style.outline = "2px solid lime";
      } else if (fortifySource && tile !== fortifySource && owner === currentPlayer) {
        attemptFortify(fortifySource, tile);
        fortifySource.style.outline = "none";
        fortifySource = null;
      }
    }
    updateUI();
  }

  function claimCapital(tile) {
    tile.dataset.owner = currentPlayer;
    tile.dataset.troops = "5";
    tile.classList.add(`p${currentPlayer}`, "capital");
    capitalCount++;
    if (capitalCount === 2) {
      phase = "reinforce";
      troopsToPlace = 3;
      currentPlayer = 1;
      status.textContent = "Player 1 (🔴), place your 3 troops.";
    } else {
      currentPlayer = 2;
      status.textContent = "Player 2 (🔵), select your capital.";
    }
    updateUI();
  }

  function isAdjacent(i1, i2) {
    const r1 = Math.floor(i1 / cols), c1 = i1 % cols;
    const r2 = Math.floor(i2 / cols), c2 = i2 % cols;
    return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
  }

  function attemptAttack(from, to) {
    const i1 = parseInt(from.dataset.index);
    const i2 = parseInt(to.dataset.index);
    const atk = parseInt(from.dataset.troops);
    const def = parseInt(to.dataset.troops);
    const defOwner = parseInt(to.dataset.owner);
    if (!isAdjacent(i1, i2)) return;
    if (defOwner === 0 && atk > 1) {
      from.dataset.troops = (atk - 1).toString();
      to.dataset.owner = currentPlayer;
      to.dataset.troops = "1";
    } else if (defOwner !== currentPlayer && atk > def) {
      from.dataset.troops = (atk - def).toString();
      to.dataset.owner = currentPlayer;
      to.dataset.troops = "1";
    }
  }

  function attemptFortify(from, to) {
    const troops = parseInt(from.dataset.troops);
    if (troops > 1) {
      from.dataset.troops = (troops - 1).toString();
      to.dataset.troops = (parseInt(to.dataset.troops) + 1).toString();
      hasFortified = true;
      phase = "attack";
      updateUI();
    }
  }

  endTurn.addEventListener("click", () => {
    if (phase === "attack") {
      phase = "fortify";
    } else if (phase === "fortify" || control[currentPlayer] === "ai") {
      currentPlayer = 3 - currentPlayer;
      phase = "reinforce";
      troopsToPlace = 3;
    }
    hasFortified = false;
    selectedTile = null;
    fortifySource = null;
    status.textContent = `Player ${currentPlayer} (${currentPlayer === 1 ? "🔴" : "🔵"}), place your 3 troops.`;
    updateUI();
  });

  fortifyBtn.addEventListener("click", () => {
    phase = "fortify";
    updateUI();
  });

  function aiTurn() {
    const owned = tiles.filter(t => parseInt(t.dataset.owner) === currentPlayer);
    if (phase === "reinforce") {
      for (let i = 0; i < troopsToPlace; i++) {
        const tile = owned[Math.floor(Math.random() * owned.length)];
        tile.dataset.troops = (parseInt(tile.dataset.troops) + 1).toString();
      }
      troopsToPlace = 0;
      phase = "attack";
      updateUI();
    } else if (phase === "attack") {
      // Skip AI attack logic for now; could add later
      endTurn.click();
    }
  }
});
