/**
 * Variant A, "Trace gate" (Canvas 2D).
 * ~150–300 thin traces flow left to right with slight noise. A faint vertical gate sits at --gate (62%) of the width.
 * Most traces pass through and continue fainter; about 1 in 12 turns accent, stops at the gate, and fades out
 * over ~600 ms. Traces bend gently away from the pointer (radius ~120 px). No text or labels.
 */
import { createStats, onThemeChange, readPalette, rgba, seeded, watchVisibility, type Env, type Mount, type Palette } from './common';

interface Trace {
  y0: number; ph1: number; ph2: number; amp: number;
  v: number; len: number; a: number;
  accent: boolean; head: number; stopped: boolean; fade: number;
}

const GATE = 0.62;
const FADE_MS = 600;
const CURSOR_R = 120;
const STEP = 18;

export const mount: Mount = (host, env: Env) => {
  const canvas = document.createElement('canvas');
  host.appendChild(canvas);
  const ctx = canvas.getContext('2d', { alpha: true })!;
  const stats = createStats();
  let rand = seeded(7);

  let W = 0, H = 0, dpr = 1, gateX = 0;
  let pal: Palette = readPalette();
  let traces: Trace[] = [];
  let px = -9999, py = -9999;
  let raf = 0, last = 0, t = 0, running = false;

  const spawn = (tr: Trace, initial: boolean) => {
    tr.y0 = rand() * H;
    tr.ph1 = rand() * Math.PI * 2;
    tr.ph2 = rand() * Math.PI * 2;
    tr.amp = 10 + rand() * 26;
    tr.v = 40 + rand() * 90;
    tr.len = 140 + rand() * 320;
    tr.a = 0.15 + rand() * 0.15; // neutral at 15–30% opacity
    tr.accent = rand() < 1 / 12;
    tr.stopped = false;
    tr.fade = 0;
    tr.head = initial ? rand() * (W + 200) - 100 : -rand() * 60;
  };

  const build = () => {
    const n = W < 700 ? 110 : 160; // fewer grey lines so the orange stops are the only high-contrast marks
    traces = Array.from({ length: n }, () => {
      const tr = {} as Trace; spawn(tr, true);
      if (env.static && tr.accent) { tr.head = gateX; tr.stopped = true; tr.fade = 0.15 + rand() * 0.5; }
      else if (tr.accent && tr.head > gateX) tr.head = gateX - rand() * 200;
      return tr;
    });
  };

  const yAt = (tr: Trace, x: number) => {
    let y = tr.y0 + tr.amp * Math.sin(x * 0.0045 + tr.ph1 + t * 0.25) + 5 * Math.sin(x * 0.012 + tr.ph2 - t * 0.4);
    const dx = x - px, dy = y - py;
    if (dx * dx + dy * dy < CURSOR_R * CURSOR_R) {
      const d = Math.sqrt(dx * dx + dy * dy);
      const f = 1 - d / CURSOR_R;
      y += (dy >= 0 ? 1 : -1) * f * f * 26; // bends gently away from the pointer
    }
    return y;
  };

  const resize = () => {
    const r = host.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    gateX = W * GATE;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    rand = seeded(7);
    build();
    draw();
  };

  const draw = () => {
    const t0 = performance.now();
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    ctx.lineCap = 'butt';

    // the gate
    ctx.strokeStyle = rgba(pal.line, 0.12);
    ctx.beginPath(); ctx.moveTo(Math.round(gateX) + 0.5, 0); ctx.lineTo(Math.round(gateX) + 0.5, H); ctx.stroke();

    for (const tr of traces) {
      const head = tr.head;
      const tail = head - tr.len;
      if (head < 0 || tail > W) continue;
      const x0 = Math.max(0, tail), x1 = Math.min(W, head);
      if (x1 - x0 < 2) continue;

      if (tr.accent) {
        // accent traces end at the gate and fade out
        const a = 1 - tr.fade;
        if (a <= 0.01) continue;
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = rgba(pal.accent, a);
        ctx.beginPath();
        let started = false;
        for (let x = x0; x <= Math.min(x1, gateX) + STEP; x += STEP) {
          const xx = Math.min(x, x1, gateX);
          const y = yAt(tr, xx);
          if (!started) { ctx.moveTo(xx, y); started = true; } else ctx.lineTo(xx, y);
          if (xx >= gateX || xx >= x1) break;
        }
        ctx.stroke();
        ctx.lineWidth = 1;
        if (tr.stopped) { // a short tick where it stopped, fading with the trace
          const yy = yAt(tr, gateX);
          ctx.beginPath(); ctx.moveTo(gateX, yy - 5); ctx.lineTo(gateX, yy + 5); ctx.stroke();
        }
        continue;
      }

      // neutral: full strength before the gate, fainter after it
      let x = x0;
      ctx.strokeStyle = rgba(pal.line, tr.a);
      ctx.beginPath();
      ctx.moveTo(x, yAt(tr, x));
      let crossed = false;
      for (x = x0 + STEP; x <= x1 + STEP; x += STEP) {
        const xx = Math.min(x, x1);
        if (!crossed && xx > gateX) {
          const yg = yAt(tr, gateX);
          ctx.lineTo(gateX, yg); ctx.stroke();
          ctx.strokeStyle = rgba(pal.line, tr.a * 0.5);
          ctx.beginPath(); ctx.moveTo(gateX, yg);
          crossed = true;
        }
        ctx.lineTo(xx, yAt(tr, xx));
        if (xx >= x1) break;
      }
      ctx.stroke();
    }
    stats.record(performance.now() - t0);
  };

  const step = (now: number) => {
    raf = 0;
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now; t += dt;
    for (const tr of traces) {
      if (tr.stopped) { tr.fade += (dt * 1000) / FADE_MS; if (tr.fade >= 1) spawn(tr, false); continue; }
      tr.head += tr.v * dt;
      if (tr.accent && tr.head >= gateX) { tr.head = gateX; tr.stopped = true; tr.fade = 0; }
      else if (tr.head - tr.len > W) spawn(tr, false);
    }
    draw();
    raf = requestAnimationFrame(step);
  };

  const setRunning = (on: boolean) => {
    if (env.static) return;
    if (on && !running) { running = true; last = performance.now(); raf = requestAnimationFrame(step); }
    else if (!on && running) { running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
  };

  const onMove = (e: PointerEvent) => { const r = host.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; };
  const onLeave = () => { px = py = -9999; };

  const ro = new ResizeObserver(() => resize());
  ro.observe(host);
  const vis = watchVisibility(host, setRunning);
  const offTheme = onThemeChange(() => { pal = readPalette(); draw(); });
  if (!env.static) { addEventListener('pointermove', onMove, { passive: true }); document.addEventListener('pointerleave', onLeave); }
  resize();
  setRunning(vis.isActive());

  return () => {
    setRunning(false); ro.disconnect(); vis.dispose(); offTheme();
    removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onLeave);
    canvas.remove();
  };
};
