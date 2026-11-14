import { animate, inView } from 'motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const root = document.documentElement;
(window as any).__mainReady = true;
let navigated = false;
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───────── Theme (instant everywhere; circular reveal from the button when supported) ───────── */
function applyTheme(next: 'light' | 'dark') {
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch {}
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#161513' : '#f4f1ea');
  syncToggleLabel();
}
function syncToggleLabel() {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-label', `Switch to ${next} theme`));
}
async function toggleTheme(button: Element) {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  if (!('startViewTransition' in document) || reduced()) return applyTheme(next);
  const r = button.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  root.classList.add('theme-vt');
  try {
    const t = document.startViewTransition(() => applyTheme(next));
    await t.ready;
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
    );
    await t.finished;
  } catch {
    /* transition skipped: theme is already applied */
  } finally {
    root.classList.remove('theme-vt');
  }
}
document.addEventListener('click', (e) => {
  const b = (e.target as Element).closest('[data-theme-toggle]');
  if (b) toggleTheme(b);
});

function e2meta(doc: Document) {
  doc.querySelector('meta[name="theme-color"]')?.setAttribute('content', root.dataset.theme === 'dark' ? '#161513' : '#f4f1ea');
}

/* Keep theme and the JS flag across ClientRouter swaps (the incoming document carries static defaults). */
document.addEventListener('astro:before-swap', (e) => {
  (window as any).__tgDestroy?.();
  const nd = (e as unknown as { newDocument: Document }).newDocument.documentElement;
  nd.dataset.theme = root.dataset.theme;
  nd.classList.add('js');
  // The incoming head carries the static (light) theme-color; keep it in step with the current theme.
  e2meta((e as unknown as { newDocument: Document }).newDocument);
  navigated = true;
});

/* ───────── Top bar: scrolled state + shared sliding pill ───────── */
let bar: HTMLElement | null = null;
let pills: HTMLElement | null = null;
let overlay: HTMLElement | null = null;
let links: HTMLAnchorElement[] = [];
let sections: { id: string; el: HTMLElement; top: number }[] = [];
let ro: ResizeObserver | null = null;
const measure = () => sections.forEach((s) => (s.top = s.el.getBoundingClientRect().top + scrollY));
let activeId: string | null = null;
let currentClip = '';

const HIDDEN = 'inset(0px 100% 0px 0px round 999px)';
const clipFor = (id: string | null) => {
  if (!pills || !id) return HIDDEN;
  const link = links.find((l) => l.dataset.section === id);
  if (!link) return HIDDEN;
  const pr = pills.getBoundingClientRect();
  const lr = link.getBoundingClientRect();
  const left = lr.left - pr.left;
  const right = pr.width - (lr.right - pr.left);
  return `inset(0px ${right.toFixed(1)}px 0px ${left.toFixed(1)}px round 999px)`;
};
/** Only clip-path animates: the pill keeps a true rounded shape while it slides and resizes. */
function movePill(id: string | null, immediate = false) {
  if (!overlay) return;
  const to = clipFor(id);
  if (immediate || reduced() || !currentClip || currentClip === HIDDEN || to === HIDDEN) {
    overlay.style.clipPath = to;
  } else {
    animate(overlay, { clipPath: [currentClip, to] }, { duration: 0.4, ease: EASE });
    overlay.style.clipPath = to;
  }
  currentClip = to;
}

function updateScrollState() {
  bar?.setAttribute('data-scrolled', String(scrollY > 16));
  if (!sections.length) return;
  const line = innerHeight * 0.4;
  let id: string | null = null;
  const y = scrollY + line; // cached section tops: no layout reads while scrolling
  for (const s of sections) if (s.top <= y) id = s.id;
  if (id !== activeId) {
    activeId = id;
    links.forEach((l) => (l.dataset.section === id ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
    movePill(id);
    // On narrow screens the section nav scrolls sideways; keep the active item in view.
    const nav = document.querySelector<HTMLElement>('[data-secnav]');
    const cur = links.find((l) => l.dataset.section === id);
    if (nav && cur && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: cur.offsetLeft - nav.clientWidth / 2 + cur.offsetWidth / 2, behavior: reduced() ? 'auto' : 'smooth' });
  }
}

let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { ticking = false; updateScrollState(); });
}, { passive: true });
addEventListener('resize', () => { currentClip = ''; movePill(activeId, true); });

/* ───────── Ink: stroke draws in (stroke-dashoffset), then its note fades in 150 ms later ───────── */
function drawInk(el: HTMLElement) {
  const paths = Array.from(el.querySelectorAll<SVGPathElement>('.stroke path'));
  const note = el.querySelector<HTMLElement>('.note');
  const dur = 0.75;
  paths.forEach((p) => animate(p, { strokeDashoffset: [1, 0] }, { duration: dur, ease: EASE }));
  if (note) animate(note, { opacity: [0, 1] }, { duration: 0.2, delay: (paths.length ? dur : 0) + 0.15, ease: 'easeOut' });
}

/* ───────── Projects filter: rows collapse (height + opacity) instead of jumping ───────── */
function setupFilters() {
  const group = document.querySelector<HTMLElement>('[data-filters]');
  const list = document.querySelector<HTMLElement>('[data-project-list]');
  if (!group || !list) return;
  group.hidden = false; // filters need JS; without it every project stays visible
  const rows = Array.from(list.querySelectorAll<HTMLElement>('.row'));
  const status = document.querySelector<HTMLElement>('[data-filter-status]');
  const empty = document.querySelector<HTMLElement>('[data-filter-empty]');
  const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>('button'));
  const apply = (f: string) => {
    let shown = 0;
    rows.forEach((r) => {
      const match = f === 'all' || r.dataset.cat === f;
      r.classList.toggle('is-out', !match);
      (r as HTMLElement & { inert: boolean }).inert = !match;
      if (match) shown++;
    });
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === f)));
    if (empty) empty.hidden = shown !== 0;
    if (status) status.textContent = 'Showing ' + shown + ' project' + (shown === 1 ? '' : 's');
  };
  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter ?? 'all')));
}

/* ───────── Case-study header band: the (otherwise unused) TraceGate, theme-aware and quiet ───────── */
async function mountTraceGate() {
  (window as any).__tgDestroy?.();
  const host = document.querySelector<HTMLElement>('[data-trace-gate]');
  if (!host) return;
  // Wait for the page transition to finish and the main thread to go idle before starting the canvas.
  await new Promise<void>((r) => setTimeout(() => ((window as any).requestIdleCallback ? (window as any).requestIdleCallback(() => r(), { timeout: 1200 }) : r()), 600));
  if (!host.isConnected) return;
  const [{ mount }, { getEnv }] = await Promise.all([import('./hero-bg/trace-gate'), import('./hero-bg/common')]);
  if (!host.isConnected) return;
  const destroy = mount(host, getEnv());
  (window as any).__tgDestroy = () => { destroy(); (window as any).__tgDestroy = null; };
}

/* ───────── Page setup (first load and after every ClientRouter navigation) ───────── */
function setup() {
  bar = document.querySelector('[data-topbar]');
  pills = document.querySelector('[data-pills]');
  overlay = document.querySelector('[data-pill-overlay]');
  links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-pills] ul:not(.overlay) a[data-section]'));
  // Section element id -> nav pill it belongs to (Open source sits under Projects; Beyond work under Education).
  const NAV: Record<string, string> = { about: 'about', experience: 'experience', work: 'work', projects: 'projects', opensource: 'projects', education: 'education', beyond: 'education' };
  sections = Object.keys(NAV)
    .map((id) => ({ id: NAV[id], el: document.getElementById(id) as HTMLElement | null, top: 0 }))
    .filter((s): s is { id: string; el: HTMLElement; top: number } => !!s.el);
  measure();
  ro?.disconnect();
  ro = new ResizeObserver(() => { measure(); updateScrollState(); });
  ro.observe(document.body);
  activeId = null;
  currentClip = '';
  syncToggleLabel();

  if (sections.length) { updateScrollState(); movePill(activeId, true); }
  else {
    // Work detail pages: Work is the current section.
    const cur = links.find((l) => l.getAttribute('aria-current') === 'page');
    bar?.setAttribute('data-scrolled', String(scrollY > 16));
    movePill(cur?.dataset.section ?? null, true);
  }

  if (!reduced()) {
    // Section content fades up 12px once on entry; at most 4 staggered (~70 ms) per container.
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const index = (el: HTMLElement) => {
      const sibs = Array.from(el.parentElement?.children ?? []).filter((c) => (c as HTMLElement).hasAttribute('data-reveal'));
      return Math.min(sibs.indexOf(el), 3);
    };
    const cols = matchMedia('(min-width: 768px)').matches ? 2 : 1;
    if (items.length) {
      inView(items, (el) => {
        const e = el as HTMLElement;
        const isCard = e.classList.contains('card');
        const delay = (isCard ? Number(e.dataset.index ?? 0) % cols : index(e)) * 0.07;
        animate(e, { opacity: [0, 1], y: [12, 0] }, { duration: 0.6, delay, ease: EASE });
        // Experience: the hairline segment draws down after the entry appears (reveals "along the hairline").
        const seg = e.querySelector<HTMLElement>('[data-seg]');
        if (seg) animate(seg, { scaleY: [0, 1] }, { duration: 0.7, delay: delay + 0.2, ease: EASE });
      }, { amount: 0.2, margin: '0px 0px -6% 0px' });
    }

    // Ink: strokes draw once as they enter view; the hero underline draws shortly after load.
    document.querySelectorAll<HTMLElement>('[data-ink]').forEach((el) => {
      if (el.hasAttribute('data-ink-load')) setTimeout(() => drawInk(el), 650);
      else inView(el, () => { drawInk(el); }, { amount: 0.6 });
    });
  }

  setupFilters();
  // After a client-side navigation, move focus to the new page heading (WCAG 2.4.3).
  if (navigated) {
    navigated = false;
    const h = document.querySelector<HTMLElement>('main h1');
    if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }
  mountTraceGate();

  // Entrance is CSS-driven; drop the flag after it ends so returning to Home shows the final state.
  if (root.classList.contains('entrance')) setTimeout(() => root.classList.remove('entrance'), 1500);
}

document.addEventListener('astro:page-load', setup);
