"use client";

import { useEffect, useRef } from "react";

export default function FondoAnimado() {
const canvasRef = useRef(null);

useEffect(() => {
const canvas = canvasRef.current;
if (!canvas) return;
const ctx = canvas.getContext("2d");
if (!ctx) return;

let particlesArray: Particle[] = [];
let animationFrameId: number;

// Configuración para pantallas Retina (alta definición)
const setCanvasSize = () => {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.scale(dpr, dpr);
};
setCanvasSize();

// Posición del ratón para interactividad
const mouse = {
  x: -1000,
  y: -1000,
  radius: 150, // Distancia máxima para interactuar con el ratón
};

const handleMouseMove = (e: MouseEvent) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

const handleMouseLeave = () => {
  mouse.x = -1000;
  mouse.y = -1000;
};

window.addEventListener("mousemove", handleMouseMove);
window.addEventListener("mouseout", handleMouseLeave);
window.addEventListener("resize", () => {
  setCanvasSize();
  init(); // Reiniciar partículas al cambiar tamaño
});

// Paleta Cyberpunk: Cian, Rosa Neón y Púrpura
const colors = ["#00f0ff", "#ff007f", "#8a2be2"];

class Particle {
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  size: number;
  color: string;

  constructor(
    x: number,
    y: number,
    directionX: number,
    directionY: number,
    size: number,
    color: string
  ) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  draw() {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    // Efecto de resplandor (Glow)
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
  }

  update() {
    // Rebotar en los bordes
    if (this.x > window.innerWidth || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > window.innerHeight || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // Mover partícula
    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

// Inicializar el sistema de partículas
const init = () => {
  particlesArray = [];
  // Cantidad de partículas basada en el tamaño de la pantalla
  const numberOfParticles = (window.innerWidth * window.innerHeight) / 10000;
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1.5;
    const x = Math.random() * (window.innerWidth - size * 2) + size * 2;
    const y = Math.random() * (window.innerHeight - size * 2) + size * 2;
    const directionX = Math.random() * 1 - 0.5; // Velocidad X
    const directionY = Math.random() * 1 - 0.5; // Velocidad Y
    const color = colors[Math.floor(Math.random() * colors.length)];
    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
};

// Conectar partículas entre sí y con el ratón
const connect = () => {
  if (!ctx) return;
  const maxDistance = 120; // Distancia para que se unan con una línea

  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distanceSq = dx * dx + dy * dy;

      // Si están cerca, dibujar una línea entre ellas
      if (distanceSq < maxDistance * maxDistance) {
        const distance = Math.sqrt(distanceSq);
        const opacity = 1 - distance / maxDistance;
        ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.25})`; // Línea cian sutil
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }

    // Conectar la partícula actual con el ratón
    const dxMouse = mouse.x - particlesArray[a].x;
    const dyMouse = mouse.y - particlesArray[a].y;
    const distanceMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

    if (distanceMouseSq < mouse.radius * mouse.radius) {
      const distanceMouse = Math.sqrt(distanceMouseSq);
      const opacity = 1 - distanceMouse / mouse.radius;
      ctx.strokeStyle = `rgba(255, 0, 127, ${opacity * 0.6})`; // Línea rosa brillante al ratón
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  }
};

// Bucle de animación
const animate = () => {
  if (!ctx) return;
  animationFrameId = requestAnimationFrame(animate);
  // Limpiar el canvas en cada frame
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  particlesArray.forEach((particle) => particle.update());
  connect();
};

init();
animate();

return () => {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseout", handleMouseLeave);
  window.removeEventListener("resize", setCanvasSize);
  cancelAnimationFrame(animationFrameId);
};


}, []);

return (

{/* El canvas captura el espacio pero deja pasar los clicks gracias al contenedor pointer-events-none /}

{/ Viñeta oscura radial para fusionar suavemente los bordes con el resto de la web */}


);
}