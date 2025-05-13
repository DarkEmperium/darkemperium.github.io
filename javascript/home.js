const canvas = document.getElementById("matrix-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const binary = "01";
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns)
  .fill()
  .map(() => Math.floor((Math.random() * canvas.height) / fontSize));

function drawMatrix() {

  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ffff";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = binary.charAt(Math.floor(Math.random() * binary.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 33);

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const newColumns = Math.floor(canvas.width / fontSize);
  drops.length = 0; 
  for (let i = 0; i < newColumns; i++) {
    drops.push(Math.floor(Math.random() * canvas.height / fontSize));
  }
});