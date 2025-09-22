const canvas = document.getElementById('Flor');
const ctx = canvas.getContext('2d');

let anguloViento = 0;

// 🌻 Dibujar pétalo
function DibujarPetalo(x, y, ancho, alto, rotacion) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotacion);
  ctx.beginPath();
  ctx.ellipse(0, 0, ancho, alto, 0, 0, 2 * Math.PI);
  const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, ancho);
  grad.addColorStop(0, "#fff176");
  grad.addColorStop(1, "#fbc02d");
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
}

// 🌻 Dibujar girasol completo
function DibujarFlor(x, y, NumeroPetalos, RadioPetalo, LargoPetalo, balanceo) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(balanceo);

  // Tallo
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, 150);
  ctx.lineWidth = 6;
  ctx.strokeStyle = "green";
  ctx.stroke();

  // Hojas
  ctx.beginPath();
  ctx.ellipse(-20, 80, 30, 15, Math.PI / 4, 0, 2 * Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(20, 100, 30, 15, -Math.PI / 4, 0, 2 * Math.PI);
  ctx.fillStyle = "green";
  ctx.fill();

  // Pétalos
  const anguloIncrement = (2 * Math.PI) / NumeroPetalos;
  for (let i = 0; i < NumeroPetalos; i++) {
    let angulo = i * anguloIncrement;
    DibujarPetalo(0, 0, RadioPetalo / 2, LargoPetalo, angulo);
  }

  // Centro
  ctx.beginPath();
  ctx.arc(0, 0, 25, 0, Math.PI * 2);
  const gradCentro = ctx.createRadialGradient(0, 0, 5, 0, 0, 25);
  gradCentro.addColorStop(0, "#6d4c41");
  gradCentro.addColorStop(1, "#3e2723");
  ctx.fillStyle = gradCentro;
  ctx.fill();

  ctx.restore();
}

// 🌻 Crear campo de girasoles animados
function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  anguloViento += 0.02;

  const numFlores = 12;
  const espacioX = canvas.width / 4;
  const espacioY = canvas.height / 3;

  for (let i = 0; i < numFlores; i++) {
    const fila = Math.floor(i / 4);
    const columna = i % 4;
    const x = espacioX * columna + espacioX / 2;
    const y = espacioY * fila + espacioY / 2;

    const balanceo = Math.sin(anguloViento + i) * 0.1;
    DibujarFlor(x, y, 18, 40, 80, balanceo);
  }

  requestAnimationFrame(animar);
}

animar();

// --- Modal de amor 💌 ---
const btnLove = document.getElementById("btnLove");
const modal = document.getElementById("loveModal");
const closeModal = document.getElementById("closeModal");

// Abrir modal
btnLove.addEventListener("click", () => {
  modal.style.display = "block";
});

// Cerrar modal al presionar la X
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar modal al hacer click fuera del contenido
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
