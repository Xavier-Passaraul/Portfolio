"use client";

import { useEffect, useRef } from "react";

export default function DnaHelix() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number, height: number, cx: number, cy: number;
    let animationId: number;
    let startTime: number | null = null;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = canvas!.width = rect.width;
      height = canvas!.height = rect.height;
      cx = width / 2;
      cy = height / 2;
    }
    window.addEventListener("resize", resize);
    resize();

    // Configuración de la estructura
    const particles: Particle[] = [];
    const spread = 3000;
    const halfSpread = spread / 2;
    const numTurns = 10;
    const helixRadius = 100;
    const xStep = 7;
    const rungSpacing = 45;
    const pointsPerRung = 8;

    // Colores con mayor luminosidad y brillo
    const color1 = "#82c8ff"; // Azul luminoso
    const color2 = "#ff82b2"; // Rosa luminoso

    class Particle {
      baseX: number;
      angleOffset: number;
      radius: number;
      color: string;
      isRung: boolean;
      startX: number;
      startY: number;
      startZ: number;
      midX: number;
      midY: number;
      midZ: number;
      delay: number;
      x: number;
      y: number;
      z: number;
      alpha: number;

      constructor(baseX: number, angleOffset: number, radius: number, color: string, isRung: boolean) {
        this.baseX = baseX;
        this.angleOffset = angleOffset;
        this.radius = radius;
        this.color = color;
        this.isRung = isRung;

        const startRadius = Math.max(width, height) + Math.random() * 500;
        const startAngle = Math.random() * Math.PI * 2;
        this.startX = Math.cos(startAngle) * startRadius;
        this.startY = Math.sin(startAngle) * startRadius;
        this.startZ = (Math.random() - 0.5) * 2000;

        this.midX = (Math.random() - 0.5) * 60;
        this.midY = (Math.random() - 0.5) * 60;
        this.midZ = (Math.random() - 0.5) * 60;

        this.delay = Math.random() * 2000;

        this.x = this.startX;
        this.y = this.startY;
        this.z = this.startZ;
        this.alpha = 0;
      }

      update(time: number) {
        // Movimiento horizontal lento
        let currentX = this.baseX - time * 0.035;
        currentX = ((currentX + halfSpread) % spread + spread) % spread - halfSpread;

        // Rotación
        const globalAngle = time * 0.001;
        const tx = currentX;

        // EFECTO ZIGZAG / OSCILACIÓN
        const zigzagY = Math.sin(currentX * 0.003 + time * 0.0005) * 120 + Math.cos(currentX * 0.008) * 30;

        const ty = Math.sin(this.angleOffset + globalAngle) * this.radius + zigzagY;
        const tz = Math.cos(this.angleOffset + globalAngle) * this.radius;

        const duration = 5000;
        let progress = (time - this.delay) / duration;
        progress = Math.max(0, Math.min(1, progress));

        if (progress < 0.35) {
          const p1 = progress / 0.35;
          const ease1 = 1 - Math.pow(1 - p1, 4);
          this.x = this.startX + (this.midX - this.startX) * ease1;
          this.y = this.startY + (this.midY - this.startY) * ease1;
          this.z = this.startZ + (this.midZ - this.startZ) * ease1;
          this.alpha = p1;
        } else if (progress < 0.5) {
          const p2 = (progress - 0.35) / 0.15;
          const swirlAngle = p2 * Math.PI * 4;
          const cosA = Math.cos(swirlAngle);
          const sinA = Math.sin(swirlAngle);
          this.x = this.midX * cosA - this.midZ * sinA;
          this.y = this.midY;
          this.z = this.midX * sinA + this.midZ * cosA;
          this.alpha = 1;
        } else {
          const p3 = (progress - 0.5) / 0.5;
          const ease3 = p3 === 1 ? 1 : 1 - Math.pow(2, -10 * p3);
          this.x = this.midX + (tx - this.midX) * ease3;
          this.y = this.midY + (ty - this.midY) * ease3;
          this.z = this.midZ + (tz - this.midZ) * ease3;
          this.alpha = 1;
        }
      }
    }

    for (let x = -halfSpread; x <= halfSpread; x += xStep) {
      const angle = (x / spread) * Math.PI * 2 * numTurns;

      particles.push(new Particle(x, angle, helixRadius, color1, false));
      particles.push(new Particle(x, angle + Math.PI, helixRadius, color2, false));

      if (Math.abs(x % rungSpacing) < xStep) {
        for (let i = 1; i < pointsPerRung; i++) {
          const ratio = i / pointsPerRung;
          const r = helixRadius * (1 - ratio * 2);
          const c = ratio < 0.5 ? color1 : color2;
          particles.push(new Particle(x, angle, r, c, true));
        }
      }
    }

    function animate(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const time = timestamp - startTime;

      // Fondo con estela para dar sensación de movimiento fluido
      ctx!.globalCompositeOperation = "source-over";
      ctx!.fillStyle = "rgba(11, 15, 25, 0.3)";
      ctx!.fillRect(0, 0, width, height);

      particles.forEach((p) => p.update(time));
      particles.sort((a, b) => b.z - a.z);

      ctx!.globalCompositeOperation = "source-over";

      const fov = 700;
      const viewDistance = 800;

      particles.forEach((p) => {
        const scale = fov / (fov + p.z + viewDistance);
        if (scale > 0) {
          const screenX = cx + p.x * scale;
          const screenY = cy + p.y * scale;
          const baseSize = p.isRung ? 1.2 : 2.2; // Un pelín más grandes para dar más luz
          const size = baseSize * scale;

          // Aumentamos la opacidad máxima de 0.5 a 0.8 para dar más vida a los colores
          const drawAlpha = p.alpha * Math.min(1, scale * 1.5) * 0.8;

          if (drawAlpha <= 0) return;

          ctx!.globalAlpha = drawAlpha;
          ctx!.fillStyle = p.color;
          ctx!.beginPath();
          ctx!.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx!.fill();
        }
      });

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 bottom-0 left-1/2 w-screen -translate-x-1/2"
      style={{ opacity: 0.85 }}
    />
  );
}