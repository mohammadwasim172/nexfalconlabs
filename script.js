// Smooth scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Neuron animation background
const canvas = document.getElementById("neuronCanvas");
const ctx = canvas.getContext("2d");
let nodes = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  nodes = Array.from({length: 80}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8
  }));
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < nodes.length; i++) {
    let n = nodes[i];
    n.x += n.vx;
    n.y += n.vy;
    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    ctx.beginPath();
    ctx.arc(n.x, n.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = "#007bff";
    ctx.fill();
    for (let j = i + 1; j < nodes.length; j++) {
      let n2 = nodes[j];
      let dist = Math.hypot(n.x - n2.x, n.y - n2.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(n2.x, n2.y);
        ctx.strokeStyle = "rgba(0,123,255,0.15)";
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw);
}
draw();
