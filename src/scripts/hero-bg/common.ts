/** Shared lifecycle for hero background art. */

export type RGB = [number, number, number];
export interface Palette { line: RGB; accent: RGB; bg: RGB; }
export interface Env { reduced: boolean; lowPower: boolean; static: boolean; }

export const getEnv = (): Env => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lowPower = (navigator.hardwareConcurrency || 8) <= 4;
  // Static first frame under reduced motion and on low-power devices.
  return { reduced, lowPower, static: reduced || lowPower };
};

const hex = (v: string): RGB => {
  const h = v.trim().replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as RGB;
};
/** Reads design tokens so both themes work: dark lines on warm off-white, light lines on near-black. */
export const readPalette = (): Palette => {
  const cs = getComputedStyle(document.documentElement);
  return { line: hex(cs.getPropertyValue('--text')), accent: hex(cs.getPropertyValue('--accent')), bg: hex(cs.getPropertyValue('--bg')) };
};
export const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
export const mix = (a: RGB, b: RGB, t: number): RGB => [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t)) as RGB;

/** Deterministic RNG so the static frame is identical every load. */
export const seeded = (seed: number) => () => {
  seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/** Frame-cost recorder (JS time spent in draw), readable via window.__heroStats() for measurement. */
export function createStats() {
  const buf: number[] = [];
  const api = {
    record(ms: number) { buf.push(ms); if (buf.length > 1200) buf.shift(); },
    summary() {
      if (!buf.length) return null;
      const s = [...buf].sort((a, b) => a - b);
      const avg = buf.reduce((p, c) => p + c, 0) / buf.length;
      return { frames: buf.length, avgMs: +avg.toFixed(3), p95Ms: +s[Math.floor(s.length * 0.95)].toFixed(3), maxMs: +s[s.length - 1].toFixed(3) };
    },
  };
  (window as any).__heroStats = () => api.summary();
  return api;
}

/** Watches theme changes (data-theme on <html>). Returns a disposer. */
export function onThemeChange(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => mo.disconnect();
}

export interface Visibility { isActive(): boolean; dispose(): void; }
/** Active only while the element is on screen AND the tab is visible. Calls onChange when that flips. */
export function watchVisibility(el: Element, onChange: (active: boolean) => void): Visibility {
  let inView = true;
  let tabVisible = !document.hidden;
  const emit = () => onChange(inView && tabVisible);
  const io = new IntersectionObserver((entries) => { inView = entries[entries.length - 1].isIntersecting; emit(); });
  io.observe(el);
  const vc = () => { tabVisible = !document.hidden; emit(); };
  document.addEventListener('visibilitychange', vc);
  return { isActive: () => inView && tabVisible, dispose() { io.disconnect(); document.removeEventListener('visibilitychange', vc); } };
}

export type Mount = (host: HTMLElement, env: Env) => () => void;
