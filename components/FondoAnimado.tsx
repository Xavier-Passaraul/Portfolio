"use client";

import { useEffect, useRef } from "react";

export default function FondoAnimado() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Si la persona activó "reducir movimiento" en su sistema, no animamos nada:
    // dejamos solo el fondo oscuro + viñeta (ya presentes en el JSX) sin gastar CPU/GPU.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    let isRunning = true;

    // DPR limitado a 2: en pantallas 3x/4x no aporta nitidez perceptible
    // y cuadriplica/nonuplica los píxeles a dibujar en cada frame.
    const getDpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const setCanvasSize = () => {
      const dpr = getDpr();
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    setCanvasSize();

    // Posición del ratón para interactividad
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 150,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Paleta Cyberpunk: Cian, Rosa Neón y Púrpura
    const colors = ["#00f0ff", "#ff007f", "#8a2be2"];

    // --- Sprites de "glow" pre-renderizados ---
    // En vez de usar ctx.shadowBlur en cada partícula y en cada frame (muy caro:
    // el navegador recalcula un blur por partícula, por frame), dibujamos UNA vez
    // por color un círculo con resplandor en un canvas aparte, y luego pegamos ese
    // sprite con drawImage (barato) en cada frame. Mismo efecto visual, mucho menos CPU.
    const glowSprites = new Map<string, HTMLCanvasElement>();
    const SPRITE_SIZE = 40;
    for (const color of colors) {
      const sprite = document.createElement("canvas");
      sprite.width = SPRITE_SIZE;
      sprite.height = SPRITE_SIZE;
      const sctx = sprite.getContext("2d")!;
      const cx = SPRITE_SIZE / 2;
      const gradient = sctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.35, color);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      sctx.fillStyle = gradient;
      sctx.beginPath();
      sctx.arc(cx, cx, cx, 0, Math.PI * 2);
      sctx.fill();
      glowSprites.set(color, sprite);
    }

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
        const sprite = glowSprites.get(this.color);
        if (!sprite) return;
        const drawSize = this.size * 6; // el sprite incluye el halo, por eso es más grande que el punto
        ctx.drawImage(
          sprite,
          this.x - drawSize / 2,
          this.y - drawSize / 2,
          drawSize,
          drawSize
        );
      }

      update() {
        if (this.x > window.innerWidth || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > window.innerHeight || this.y < 0) {
          this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;

        this.draw();
      }
    }

    // Tope de partículas: antes la cantidad crecía sin límite con el área de
    // pantalla (en un monitor 4K llegaba a ~800, con ~640.000 chequeos de
    // conexión por frame). Con este tope el efecto se ve igual de "vivo" pero
    // el costo por frame queda acotado sin importar el tamaño de pantalla.
    const MAX_PARTICLES = 90;

    const init = () => {
      particlesArray = [];
      const numberOfParticles = Math.min(
        MAX_PARTICLES,
        Math.floor((window.innerWidth * window.innerHeight) / 10000)
      );
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1.5;
        const x = Math.random() * (window.innerWidth - size * 2) + size * 2;
        const y = Math.random() * (window.innerHeight - size * 2) + size * 2;
        const directionX = Math.random() * 1 - 0.5;
        const directionY = Math.random() * 1 - 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particlesArray.push(
          new Particle(x, y, directionX, directionY, size, color)
        );
      }
    };

    const connect = () => {
      const maxDistance = 120;

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < maxDistance * maxDistance) {
            const distance = Math.sqrt(distanceSq);
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }

        const dxMouse = mouse.x - particlesArray[a].x;
        const dyMouse = mouse.y - particlesArray[a].y;
        const distanceMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;

        if (distanceMouseSq < mouse.radius * mouse.radius) {
          const distanceMouse = Math.sqrt(distanceMouseSq);
          const opacity = 1 - distanceMouse / mouse.radius;
          ctx.strokeStyle = `rgba(255, 0, 127, ${opacity * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particlesArray.forEach((particle) => particle.update());
      connect();
    };

    // El resize se debounce: reconstruir el canvas y reiniciar partículas en
    // CADA evento de resize (que puede dispararse decenas de veces al arrastrar
    // una ventana) era costoso. Esperamos a que el usuario termine de mover/rotar.
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasSize();
        init();
      }, 150);
    };

    // Pausar el bucle cuando la pestaña no está visible: evita quemar batería/CPU
    // de fondo cuando el usuario cambió a otra pestaña o minimizó la ventana.
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        if (!isRunning) {
          isRunning = true;
          animate();
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    init();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimeout);
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* El canvas captura el espacio pero deja pasar los clicks gracias al contenedor pointer-events-none */}
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Viñeta oscura radial para fusionar suavemente los bordes con el resto de la web */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0a0e_90%)]" />
    </div>
  );
}
