const canvas = document.getElementById("mapCanvas");
const ctx = canvas.getContext("2d");
const status = document.getElementById("status");

// Define hand-drawn-style regions as rectangles for now
const regions = [
  { id: "North Point", x: 50, y: 40, w: 100, h: 80, color: "#2e7d32", soldiers: 2 },
  { id: "Duname", x: 180, y: 60, w: 120, h: 90, color: "#1565c0", soldiers: 3 },
  { id: "Eastern Fields", x: 330, y: 100, w: 140, h: 80, color: "#ff9800", soldiers: 0, income: 2 },
  { id: "Southern Bay", x: 80, y: 180, w: 180, h: 90, color: "#9c27b0", soldiers: 0, income: 2 },
  { id: "Central Valley", x: 290, y: 220, w: 150, h: 100, color: "#f44336", soldiers: 1, income: 2 },
  { id: "Western Hills", x: 490, y: 160, w: 140, h: 90, color: "#00bcd4", soldiers: 2 },
  { id: "Fortress Peak", x: 570, y: 60, w: 100, h: 80, color: "#795548", soldiers: 4 }
];

function drawMap() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  regions.forEach(r => {
    ctx.fillStyle = r.color;
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.strokeStyle = "#111";
    ctx.strokeRect(r.x, r.y, r.w, r.h);

    ctx.fillStyle = "#fff";
    ctx.font = "12px sans-serif";
    ctx.fillText(`${r.id}`, r.x + 6, r.y + 16);
    ctx.fillText(`🎖️${r.soldiers ?? 0}`, r.x + 6, r.y + 32);
    if (r.income) ctx.fillText(`💰+${r.income}`, r.x + 6, r.y + 48);
  });
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;

  const clicked = regions.find(r =>
    mx >= r.x && mx <= r.x + r.w &&
    my >= r.y && my <= r.y + r.h
  );

  if (clicked) {
    status.textContent = `🧭 ${clicked.id}: ${clicked.soldiers ?? 0} soldiers${clicked.income ? `, +${clicked.income} income` : ""}`;
  } else {
    status.textContent = "🌊 You clicked the sea. Strategic retreat?";
  }
});

drawMap();
