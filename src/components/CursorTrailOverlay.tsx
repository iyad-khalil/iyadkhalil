import { useEffect, useRef } from "react";

declare global {
  interface Window {
    p5?: any;
  }
}

const P5_CDN =
  "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js";

function ensureP5Loaded(): Promise<any> {
  if (window.p5) return Promise.resolve(window.p5);

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(
      "script[data-p5-cdn='true']",
    ) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener("load", () => resolve(window.p5), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load p5.js script")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = P5_CDN;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-p5-cdn", "true");
    script.onload = () => resolve(window.p5);
    script.onerror = () => reject(new Error("Failed to load p5.js script"));
    document.head.appendChild(script);
  });
}

export function CursorTrailOverlay() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let instance: any = null;
    let enabled = true;
    let desktopEnabled = true;
    let hasPointer = false;
    let overHeroAnimationZone = false;
    let lastMoveTs = 0;
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let onPointerMove: ((e: PointerEvent) => void) | null = null;
    let onResizeDesktopCheck: (() => void) | null = null;

    const updateDesktopEnabled = () => {
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      desktopEnabled = hasFinePointer && window.innerWidth >= 768;
    };

    const init = async () => {
      try {
        const P5 = await ensureP5Loaded();
        if (disposed || !host) return;

        const sketch = (p: any) => {
          const trailCount = 18;
          const trail = Array.from({ length: trailCount }, () => ({
            x: p.width * 0.5,
            y: p.height * 0.5,
            angle: 0,
          }));
          const segmentGap = 28;
          const baseDashLength = 9;
          let circleBlend = 0;
          let circleTarget = 0;
          let orbitPhase = 0;

          p.setup = () => {
            const c = p.createCanvas(window.innerWidth, window.innerHeight);
            c.parent(host);
            p.pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
            p.colorMode(p.HSB, 360, 100, 100, 1);
            p.rectMode(p.CENTER);
            p.noStroke();
          };

          p.windowResized = () => {
            p.resizeCanvas(window.innerWidth, window.innerHeight);
          };

          p.draw = () => {
            p.clear();
            if (!desktopEnabled || !enabled || !hasPointer || overHeroAnimationZone) return;

            pointer.x = p.lerp(pointer.x, target.x, 0.3);
            pointer.y = p.lerp(pointer.y, target.y, 0.3);
            const idle = performance.now() - lastMoveTs > 170;
            circleTarget = idle ? 1 : 0;
            // Time-based eased transition for smoother morphing between states.
            const blendStep = 0.06;
            circleBlend += (circleTarget - circleBlend) * blendStep;
            const easedBlend = circleBlend * circleBlend * (3 - 2 * circleBlend);
            orbitPhase += 0.03;

            // Line mode target positions (train)
            const lineTargets = trail.map(() => ({ x: 0, y: 0 }));
            lineTargets[0].x = pointer.x;
            lineTargets[0].y = pointer.y;
            for (let i = 1; i < trail.length; i++) {
              const prev = lineTargets[i - 1];
              const curr = trail[i];
              const dx = curr.x - prev.x;
              const dy = curr.y - prev.y;
              const dist = Math.hypot(dx, dy);
              const ux = dist > 0.001 ? dx / dist : Math.cos(curr.angle);
              const uy = dist > 0.001 ? dy / dist : Math.sin(curr.angle);
              lineTargets[i].x = prev.x + ux * segmentGap;
              lineTargets[i].y = prev.y + uy * segmentGap;
            }

            // Circle mode target positions around cursor
            const circleTargets = trail.map(() => ({ x: 0, y: 0 }));
            const radius = segmentGap * 2.2;
            for (let i = 0; i < trail.length; i++) {
              const a = orbitPhase + (i / trail.length) * p.TWO_PI;
              circleTargets[i].x = pointer.x + Math.cos(a) * radius;
              circleTargets[i].y = pointer.y + Math.sin(a) * radius;
            }

            // Blend between line and circle targets.
            for (let i = 0; i < trail.length; i++) {
              const tx = p.lerp(lineTargets[i].x, circleTargets[i].x, easedBlend);
              const ty = p.lerp(lineTargets[i].y, circleTargets[i].y, easedBlend);
              trail[i].x = p.lerp(trail[i].x, tx, 0.52);
              trail[i].y = p.lerp(trail[i].y, ty, 0.52);
              if (i > 0) {
                const prev = trail[i - 1];
                trail[i].angle = Math.atan2(prev.y - trail[i].y, prev.x - trail[i].x);
              }
            }

            for (let i = trail.length - 1; i >= 0; i--) {
              const t = i / (trail.length - 1);
              const diamondSize = baseDashLength * 0.7 + (1 - t) * 5.2;
              const alpha = (1 - t) * 0.85;
              const curr = trail[i];
              const hue = (orbitPhase * 120 + (1 - t) * 360) % 360;
              p.fill(hue, 90, 100, alpha);
              p.push();
              p.translate(curr.x, curr.y);
              p.rotate(Math.PI / 4);
              p.rect(0, 0, diamondSize, diamondSize, 1.5);
              p.pop();
            }
          };
        };

        instance = new P5(sketch, host);

        onPointerMove = (e: PointerEvent) => {
          if (!desktopEnabled) return;
          hasPointer = true;
          lastMoveTs = performance.now();
          target.x = e.clientX;
          target.y = e.clientY;

          const zone = document.getElementById("hero-animation-zone");
          if (!zone) {
            overHeroAnimationZone = false;
            return;
          }
          const rect = zone.getBoundingClientRect();
          overHeroAnimationZone =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom;
        };
        onResizeDesktopCheck = () => updateDesktopEnabled();
        updateDesktopEnabled();
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        window.addEventListener("resize", onResizeDesktopCheck);
      } catch {
        // Non-blocking visual enhancement; fail silently.
      }
    };

    init();

    return () => {
      disposed = true;
      if (onPointerMove) window.removeEventListener("pointermove", onPointerMove);
      if (onResizeDesktopCheck) window.removeEventListener("resize", onResizeDesktopCheck);
      if (instance) instance.remove();
    };
  }, []);

  return <div ref={hostRef} className="fixed inset-0 z-30 pointer-events-none" />;
}
