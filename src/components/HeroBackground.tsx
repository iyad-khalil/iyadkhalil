import React, { useEffect, useRef } from "react";

/**
 * Fullscreen animated canvas background (white points on dark bg).
 * Drop it inside a parent with position: relative, and keep this canvas absolute + behind (z-0),
 * while your foreground content stays on a higher z-index (e.g., z-10).
 */
type HeroBackgroundProps = {
  className?: string;
  /** Number of animated points */
  pointCount?: number;
  /** Animation speed multiplier */
  speed?: number;
  /** Global alpha of points */
  alpha?: number;
};

const XLIM: [number, number] = [70, 330];
const YLIM: [number, number] = [30, 350];

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  className = "",
  pointCount = 10000,
  speed = 0.6,
  alpha = 0.9,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number>();
  const iRef = useRef<Float64Array>();

  // Precompute i array once
  if (!iRef.current) {
    // i goes from 9999 down to 0 in the original code
    iRef.current = new Float64Array(pointCount);
    for (let idx = 0; idx < pointCount; idx++) {
      iRef.current[idx] = pointCount - 1 - idx;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let running = true;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const iArr = iRef.current!;
    const n = iArr.length;

    // Constants mirroring the Mathematica/Python port
    const x = iArr; // x = i
    const y = new Float64Array(n);
    for (let k = 0; k < n; k++) y[k] = iArr[k] / 235.0;

    const draw = (time: number) => {
      if (!running) return;
      const t = (time * 0.001 * speed) % (2 * Math.PI);

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      // mapping factors to transform the original range (XLIM/YLIM) to canvas size
      const sx = width / (XLIM[1] - XLIM[0]);
      const sy = height / (YLIM[1] - YLIM[0]);
      const ox = -XLIM[0] * sx;
      const oy = -YLIM[0] * sy;

      ctx.clearRect(0, 0, width, height);

      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#ffffff";

      // We’ll batch draw using beginPath/arc for performance
      ctx.beginPath();

      for (let k = 0; k < n; k++) {
        const xx = x[k];
        const yy = y[k];

        const kval = (4 + Math.sin(xx / 11 + 8 * t)) * Math.cos(xx / 14);
        const e = yy / 8 - 19;
        const d = Math.sqrt(kval * kval + e * e) + Math.sin(yy / 9 + 2 * t);
        const q = 2 * Math.sin(2 * kval) + Math.sin(yy / 17) * kval * (9 + 2 * Math.sin(yy - 3 * d));
        const c = d * d / 49 - t;
        const xp = q + 50 * Math.cos(c) + 200;
        const yp = q * Math.sin(c) + d * 39 - 440;
        const X = xp;
        const Y = 400 - yp;

        // map to canvas space
        const cx = X * sx + ox;
        const cy = Y * sy + oy;

        // quick bounds check (avoid drawing offscreen points)
        if (cx >= -1 && cx <= width + 1 && cy >= -1 && cy <= height + 1) {
          // using a tiny rect is faster than arc in many cases; but arc looks nicer.
          // ctx.rect(cx, cy, 1, 1);
          ctx.moveTo(cx + 0.5, cy);
          ctx.arc(cx, cy, 0.6, 0, Math.PI * 2);
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
      className={`absolute inset-0 w-full h-full -z-10 pointer-events-none ${className}`}
    />
  );
};
