import React, { useEffect, useRef } from "react";
import portraitSrc from "../public/source.png";

type HeroBackgroundProps = {
  pointCount?: number;
  speed?: number;
  alpha?: number;
  className?: string;
  imageSrc?: string;
};

type DashParticle = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  length: number;
  baseAlpha: number;
  currentAlpha: number;
  delay: number;
};

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  pointCount = 1800,
  speed = 0.5,
  alpha = 0.9,
  className,
  imageSrc = portraitSrc,
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const particlesRef = useRef<DashParticle[]>([]);
  const imageLoadedRef = useRef(false);
  const startTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mounted = true;
    let observer: ResizeObserver | null = null;
    let cachedW = 0;
    let cachedH = 0;

    const setupCanvas = () => {
      const rect = host.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (width === cachedW && height === cachedH) return;
      cachedW = width;
      cachedH = height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const buildParticlesFromImage = (img: HTMLImageElement) => {
      const rect = host.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      if (width < 2 || height < 2) return;

      const offscreen = document.createElement("canvas");
      const offCtx = offscreen.getContext("2d");
      if (!offCtx) return;

      offscreen.width = width;
      offscreen.height = height;
      offCtx.clearRect(0, 0, width, height);

      const portraitScale = 0.88;
      const imgAspect = img.width / img.height;
      let drawH = height * portraitScale;
      let drawW = drawH * imgAspect;

      if (drawW > width * portraitScale) {
        drawW = width * portraitScale;
        drawH = drawW / imgAspect;
      }

      const offsetX = (width - drawW) / 2;
      const offsetY = (height - drawH) / 2;
      offCtx.drawImage(img, offsetX, offsetY, drawW, drawH);

      const imageData = offCtx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      const particles: DashParticle[] = [];

      const densityFactor = Math.max(0.6, Math.min(1.6, Math.sqrt(pointCount / 1800)));
      const rowGap = Math.max(4, Math.round(6 / densityFactor));
      const xStep = Math.max(3, Math.round(4 / densityFactor));

      for (let y = 0; y < height; y += rowGap) {
        let x = 0;
        while (x < width) {
          const i = (y * width + x) * 4;
          const a = pixels[i + 3];

          if (a > 128) {
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];
            const brightness = (r + g + b) / (3 * 255);
            const lineLength = Math.floor(3 + brightness * 12);

            const scatterRange = Math.min(width, height) * 0.75;
            const scatterX = (Math.random() - 0.5) * scatterRange;
            const scatterY = (Math.random() - 0.5) * scatterRange;

            particles.push({
              x: x + scatterX,
              y: y + scatterY,
              targetX: x,
              targetY: y,
              vx: 0,
              vy: 0,
              length: lineLength,
              baseAlpha: (0.5 + brightness * 0.5) * alpha,
              currentAlpha: 0,
              delay: Math.random() * 0.35,
            });

            x += lineLength + 3;
          } else {
            x += xStep;
          }
        }
      }

      particlesRef.current = particles;
      imageLoadedRef.current = true;
      startTimeRef.current = performance.now();
    };

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      if (!mounted) return;
      setupCanvas();
      buildParticlesFromImage(img);
    };

    const draw = () => {
      if (!mounted) return;
      const rect = host.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      ctx.clearRect(0, 0, width, height);

      if (!imageLoadedRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const elapsed = ((performance.now() - startTimeRef.current) / 1000) * speed;
      const maxDist = Math.min(width, height) * 0.23;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const particleTime = elapsed - p.delay;
        if (particleTime < 0) continue;

        const fadeProgress = Math.min(particleTime / 1.5, 1);
        const easedFade = 1 - Math.pow(1 - fadeProgress, 2);
        p.currentAlpha = p.baseAlpha * easedFade;

        const moveProgress = Math.min(particleTime / 2.5, 1);
        const easedMove = 1 - Math.pow(1 - moveProgress, 3);

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 2;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const pullStrength = 0.01 + easedMove * 0.07;
        p.vx += dx * pullStrength;
        p.vy += dy * pullStrength;
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;

        ctx.strokeStyle = `rgba(100, 255, 218, ${p.currentAlpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length, p.y);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    setupCanvas();
    observer = new ResizeObserver(() => {
      setupCanvas();
      if (img.complete) buildParticlesFromImage(img);
    });
    observer.observe(host);

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      mounted = false;
      if (observer) observer.disconnect();
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pointCount, speed, alpha, imageSrc]);

  return (
    <div
      ref={hostRef}
      className={className ?? "absolute inset-0 w-full h-full"}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ cursor: "crosshair" }}
      />
    </div>
  );
};
