import React, { useEffect, useRef } from "react";

type HeroBackgroundProps = {
  pointCount?: number;
  speed?: number;
  alpha?: number;
};

const XLIM: [number, number] = [70, 330];
const YLIM: [number, number] = [30, 350];

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  pointCount = 9000,
  speed = 0.5,
  alpha = 0.85,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Precompute i and y arrays
    const iArr = new Float64Array(pointCount);
    for (let k = 0; k < pointCount; k++) iArr[k] = pointCount - 1 - k;
    const yArr = new Float64Array(pointCount);
    for (let k = 0; k < pointCount; k++) yArr[k] = iArr[k] / 235.0;

    const draw = (time: number) => {
      if (!running) return;
      const t = (time * 0.001 * speed) % (2 * Math.PI);

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const sx = width / (XLIM[1] - XLIM[0]);
      const sy = height / (YLIM[1] - YLIM[0]);
      const ox = -XLIM[0] * sx;
      const oy = -YLIM[0] * sy;

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();

      for (let k = 0; k < pointCount; k++) {
        const xx = iArr[k];
        const yy = yArr[k];

        const kval = (4 + Math.sin(xx / 11 + 8 * t)) * Math.cos(xx / 14);
        const e = yy / 8 - 19;
        const d = Math.sqrt(kval * kval + e * e) + Math.sin(yy / 9 + 2 * t);
        const q =
          2 * Math.sin(2 * kval) +
          Math.sin(yy / 17) * kval * (9 + 2 * Math.sin(yy - 3 * d));
        const c = (d * d) / 49 - t;
        const xp = q + 50 * Math.cos(c) + 200;
        const yp = q * Math.sin(c) + d * 39 - 440;
        const X = xp;
        const Y = 400 - yp;

        const cx = X * sx + ox;
        const cy = Y * sy + oy;
        if (cx >= -1 && cx <= width + 1 && cy >= -1 && cy <= height + 1) {
          ctx.moveTo(cx + 0.5, cy);
          ctx.arc(cx, cy, 0.5, 0, Math.PI * 2);
        }
      }

      ctx.fill();
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pointCount, speed, alpha]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};
