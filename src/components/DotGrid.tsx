import { useEffect, useRef, useState } from "react";

const SPACING = 22;
const BASE_RADIUS = 1.2;
const MAX_RADIUS = 4;
const REACH = 130;
const EASE = 0.14;
const FOUND_RADIUS = 2.6;
const FOUND_ENERGY = 0.55;
const COMPLETE_AT = 0.9;

// The hidden smiley face, largest first: the small one is for panels too
// short for the large one. Each pixel covers scale x scale dots.
const FACES = [
  [
    "001111100",
    "010000010",
    "100101001",
    "100101001",
    "100000001",
    "101000101",
    "100111001",
    "010000010",
    "001111100",
  ],
  ["01010", "01010", "00000", "10001", "01110"],
];

// The hero's signature element: a still field of dots that light up in the
// accent colour around the pointer. One diagonal sweep plays on load so the
// grid also shows itself on touch screens. A smiley face is hidden in the grid:
// dots the pointer passes over that belong to it stay lit until it is uncovered.
export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const styles = getComputedStyle(canvas);
    const muted = styles.getPropertyValue("--muted").trim() || "#9aa6bb";
    const accent = styles.getPropertyValue("--accent").trim() || "#ffcf3d";
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let energy = new Float32Array(0);
    let pointer: { x: number; y: number } | null = null;
    let frame = 0;
    let sweepStart = 0;
    let hidden = new Int32Array(0);
    let found = new Uint8Array(0);
    let foundCells = new Uint8Array(0);
    let foundCount = 0;
    let complete = false;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(width / SPACING);
      rows = Math.floor(height / SPACING);
      energy = new Float32Array(cols * rows);
      placeFace();
      draw();
    };

    // Places the face at the largest size that fits, centred. Progress carries
    // over when the face keeps its size.
    const placeFace = () => {
      let face = FACES[0];
      let scale = 0;
      for (const candidate of FACES) {
        const fit = Math.min(
          3,
          Math.floor(cols / candidate[0].length),
          Math.floor(rows / candidate.length),
        );
        if (fit * candidate[0].length > scale * face[0].length) {
          face = candidate;
          scale = fit;
        }
      }
      const left = Math.floor((cols - face[0].length * scale) / 2);
      const top = Math.floor((rows - face.length * scale) / 2);
      const cells: number[] = [];
      face.forEach((line, y) => {
        [...line].forEach((pixel, x) => {
          if (pixel !== "1") return;
          for (let dy = 0; dy < scale; dy++) {
            for (let dx = 0; dx < scale; dx++) {
              cells.push((top + y * scale + dy) * cols + left + x * scale + dx);
            }
          }
        });
      });
      if (cells.length !== hidden.length) {
        found = new Uint8Array(cells.length);
        if (complete) found.fill(1);
        foundCount = complete ? cells.length : 0;
      }
      hidden = Int32Array.from(cells);
      foundCells = new Uint8Array(cols * rows);
      hidden.forEach((i, k) => (foundCells[i] = found[k]));
    };

    const reveal = () => {
      if (complete || !pointer) return;
      for (let k = 0; k < hidden.length; k++) {
        if (found[k]) continue;
        const i = hidden[k];
        const col = i % cols;
        const row = (i - col) / cols;
        const distance = Math.hypot(dotX(col) - pointer.x, dotY(row) - pointer.y);
        if (1 - distance / REACH < FOUND_ENERGY) continue;
        found[k] = 1;
        foundCells[i] = 1;
        foundCount++;
      }
      if (hidden.length && foundCount / hidden.length >= COMPLETE_AT) {
        complete = true;
        found.fill(1);
        hidden.forEach((i) => (foundCells[i] = 1));
        foundCount = hidden.length;
      }
      setProgress(hidden.length ? foundCount / hidden.length : 0);
    };

    // Offsets centre the grid inside the canvas
    const dotX = (col: number) => (width - (cols - 1) * SPACING) / 2 + col * SPACING;
    const dotY = (row: number) => (height - (rows - 1) * SPACING) / 2 + row * SPACING;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = muted;
      ctx.globalAlpha = 0.32;
      ctx.beginPath();
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (energy[row * cols + col] > 0.02) continue;
          if (foundCells[row * cols + col]) continue;
          ctx.moveTo(dotX(col) + BASE_RADIUS, dotY(row));
          ctx.arc(dotX(col), dotY(row), BASE_RADIUS, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      ctx.fillStyle = accent;
      ctx.globalAlpha = complete ? 1 : 0.75;
      ctx.beginPath();
      for (let k = 0; k < hidden.length; k++) {
        if (!found[k] || energy[hidden[k]] > 0.02) continue;
        const col = hidden[k] % cols;
        const row = (hidden[k] - col) / cols;
        ctx.moveTo(dotX(col) + FOUND_RADIUS, dotY(row));
        ctx.arc(dotX(col), dotY(row), FOUND_RADIUS, 0, Math.PI * 2);
      }
      ctx.fill();

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const e = energy[row * cols + col];
          if (e <= 0.02) continue;
          ctx.globalAlpha = 0.3 + e * 0.7;
          ctx.beginPath();
          const base = foundCells[row * cols + col] ? FOUND_RADIUS : BASE_RADIUS;
          ctx.arc(dotX(col), dotY(row), base + e * (MAX_RADIUS - base), 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const tick = (time: number) => {
      let target = pointer;
      if (!target && sweepStart) {
        const progress = (time - sweepStart) / 1800;
        if (progress < 1) {
          target = { x: width * (1.1 - progress * 1.2), y: height * (0.15 + progress * 0.7) };
        } else {
          sweepStart = 0;
        }
      }

      let active = Boolean(target);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const i = row * cols + col;
          let goal = 0;
          if (target) {
            const distance = Math.hypot(dotX(col) - target.x, dotY(row) - target.y);
            goal = Math.max(0, 1 - distance / REACH);
          }
          energy[i] += (goal - energy[i]) * EASE;
          if (energy[i] > 0.005) active = true;
        }
      }

      draw();
      frame = active ? requestAnimationFrame(tick) : 0;
    };

    const start = () => {
      if (!frame && !reduceMotion.matches) frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const near = x > -REACH && y > -REACH && x < width + REACH && y < height + REACH;
      pointer = near ? { x, y } : null;
      if (!near) return;
      reveal();
      // Without motion the grid stays still, but uncovered dots still show
      if (reduceMotion.matches) draw();
      else start();
    };

    const onPointerLeave = () => {
      pointer = null;
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("pointercancel", onPointerLeave);

    if (!reduceMotion.matches) {
      sweepStart = performance.now() + 400;
      start();
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("pointercancel", onPointerLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="dot-grid" aria-hidden="true" />
      {progress < 1 ? (
        <p className="dot-grid-status label" aria-hidden="true">
          <span>Something is under the dots</span>
          <span>{Math.round(progress * 100)}%</span>
        </p>
      ) : (
        <p className="dot-grid-status label">
          <span aria-hidden="true">Found it</span>
          <a className="text-link" href="#contact">
            Say hello
          </a>
        </p>
      )}
    </>
  );
}
