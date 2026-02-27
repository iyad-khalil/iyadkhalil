import React, { useEffect, useRef } from "react";

type HeroBackgroundProps = {
  pointCount?: number;
  speed?: number;
  alpha?: number;
  className?: string;
};

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  pointCount = 2200,
  speed = 0.5,
  alpha = 0.9,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMouseMove = (event: MouseEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      target.x = (event.clientX / w) * 2 - 1;
      target.y = (event.clientY / h) * 2 - 1;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    // Generate a 3D point cloud on a thick shell to simulate depth.
    const points = new Array(pointCount).fill(0).map(() => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 90 + Math.random() * 80;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      return { x, y, z, jitter: Math.random() * Math.PI * 2 };
    });

    const draw = (time: number) => {
      if (!running) return;
      const t = time * 0.001 * speed;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const focal = Math.min(width, height) * 1.1;

      ctx.clearRect(0, 0, width, height);

      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;

      const rotY = t * 0.35 + mouse.x * 0.9;
      const rotX = Math.sin(t * 0.25) * 0.2 + mouse.y * 0.6;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const pulse = 1 + Math.sin(t * 1.4 + p.jitter) * 0.08;
        const px = p.x * pulse;
        const py = p.y * pulse;
        const pz = p.z * pulse;

        // Rotate Y
        const x1 = px * cosY - pz * sinY;
        const z1 = px * sinY + pz * cosY;
        // Rotate X
        const y2 = py * cosX - z1 * sinX;
        const z2 = py * sinX + z1 * cosX;

        const depth = z2 + 320;
        if (depth <= 1) continue;

        const scale = focal / depth;
        const sx = cx + x1 * scale;
        const sy = cy + y2 * scale;
        if (sx < -10 || sx > width + 10 || sy < -10 || sy > height + 10) continue;

        const opacity = Math.max(0.08, Math.min(1, (1 - z2 / 280) * alpha));
        const size = Math.max(0.45, Math.min(2.1, scale * 1.15));

        ctx.globalAlpha = opacity;
        ctx.fillStyle = "#CCD6F6";
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pointCount, speed, alpha]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "absolute inset-0 w-full h-full pointer-events-none"}
    />
  );
};
