/**
 * Variant C, Background Paths (21st.dev "Background Paths" by kokonutd, adapted to vanilla + CSS).
 * Two mirrored fans of 36 flowing SVG paths in neutral tones. The same gate idea: a handful of paths are accent and
 * are clipped at a vertical line (62% width), so they visibly end there. Motion is CSS-only (dash offset), no JS per frame.
 */
import { onThemeChange, readPalette, rgba, seeded, watchVisibility, type Env, type Mount, type Palette } from './common';

const NS = 'http://www.w3.org/2000/svg';
const VB_W = 696;
const GATE = 0.62;
const COUNT = 20; // fewer paths: SVG dash animation repaints every frame, cost scales with path count
const VB_X = -260; // shifts the fan to the right so it owns the right side

const CSS = `
.bgp-path{fill:none;stroke-dasharray:.3 .7;stroke-linecap:round;animation:bgp-flow var(--d) linear var(--dl) infinite}
.bgp-acc{animation-name:bgp-acc}
.bgp-paused .bgp-path{animation-play-state:paused}
@keyframes bgp-flow{from{stroke-dashoffset:0}to{stroke-dashoffset:-1}}
@keyframes bgp-acc{0%{stroke-dashoffset:.15;opacity:0}12%{opacity:1}78%{opacity:1}100%{stroke-dashoffset:-.85;opacity:0}}
.bgp-static .bgp-path{animation:none}
`;

export const mount: Mount = (host, env: Env) => {
  const rand = seeded(11);
  const style = document.createElement('style');
  style.textContent = CSS;
  host.appendChild(style);

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('focusable', 'false');
  if (env.static) svg.classList.add('bgp-static');

  const defs = document.createElementNS(NS, 'defs');
  const clip = document.createElementNS(NS, 'clipPath');
  clip.id = 'bgp-gate-clip';
  const clipRect = document.createElementNS(NS, 'rect');
  clipRect.setAttribute('x', '-2000'); clipRect.setAttribute('y', '-2000');
  clipRect.setAttribute('width', String(2000 + VB_X + VB_W * GATE)); clipRect.setAttribute('height', '6000');
  clip.appendChild(clipRect); defs.appendChild(clip); svg.appendChild(defs);

  const gNeutral = document.createElementNS(NS, 'g');
  const gAccent = document.createElementNS(NS, 'g');
  gAccent.setAttribute('clip-path', 'url(#bgp-gate-clip)');
  svg.appendChild(gNeutral); svg.appendChild(gAccent);

  interface P { el: SVGPathElement; i: number; accent: boolean; }
  const paths: P[] = [];
  for (const position of [1, -1]) {
    for (let i = 0; i < COUNT; i++) {
      const k = i * 5 * position;
      const d =
        `M${-(380 - k)} ${-(189 + i * 6)}` +
        `C${-(380 - k)} ${-(189 + i * 6)} ${-(312 - k)} ${216 - i * 6} ${152 - k} ${343 - i * 6}` +
        `C${616 - k} ${470 - i * 6} ${684 - k} ${875 - i * 6} ${684 - k} ${875 - i * 6}`;
      const el = document.createElementNS(NS, 'path');
      el.setAttribute('d', d);
      el.setAttribute('pathLength', '1');
      const accent = (i * 2 + (position > 0 ? 0 : 1)) % 12 === 5; // ≈ 1 in 12
      el.setAttribute('class', accent ? 'bgp-path bgp-acc' : 'bgp-path');
      const dur = accent ? 11 + rand() * 5 : 18 + rand() * 10;
      el.style.setProperty('--d', `${dur.toFixed(1)}s`);
      el.style.setProperty('--dl', `${(-rand() * dur).toFixed(1)}s`);
      if (env.static) el.style.strokeDashoffset = String(-rand());
      (accent ? gAccent : gNeutral).appendChild(el);
      paths.push({ el, i, accent });
    }
  }
  host.appendChild(svg);

  const gate = document.createElement('div');
  gate.style.cssText = `position:absolute;top:0;bottom:0;left:${GATE * 100}%;width:1px;background:currentColor;opacity:.12;`;
  host.appendChild(gate);

  let pal: Palette = readPalette();
  const paint = () => {
    gate.style.color = rgba(pal.line, 1);
    const r = host.getBoundingClientRect();
    const scale = Math.max(0.3, r.width / VB_W);
    for (const p of paths) {
      p.el.setAttribute('stroke', p.accent ? rgba(pal.accent, 0.85) : rgba(pal.line, 1));
      p.el.style.opacity = p.accent ? '' : String(0.12 + p.i * 0.009); // neutral 10–30%
      p.el.setAttribute('stroke-width', ((0.9 + p.i * 0.02) / scale).toFixed(3));
    }
  };
  const fit = () => {
    const r = host.getBoundingClientRect();
    if (!r.width) return;
    svg.setAttribute('viewBox', `${VB_X} 0 ${VB_W} ${(VB_W * r.height / r.width).toFixed(1)}`);
    paint();
  };
  const ro = new ResizeObserver(fit);
  ro.observe(host);
  fit();

  const offTheme = onThemeChange(() => { pal = readPalette(); paint(); });
  const vis = watchVisibility(host, (on) => svg.classList.toggle('bgp-paused', !on));
  return () => { ro.disconnect(); offTheme(); vis.dispose(); style.remove(); svg.remove(); gate.remove(); };
};
