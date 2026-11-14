import { animate, inView } from 'motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const root = document.documentElement;
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ───────── Theme (instant everywhere; circle reveal from the button when supported) ───────── */
function applyTheme(next: 'light' | 'dark') {
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch {}
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'light' ? '#fafaf8' : '#0c0c0b');
  syncToggleLabel();
}
function syncToggleLabel() {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  document.querySelectorAll('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-label', `Switch to ${next} theme`));
}
async function toggleTheme(button: Element) {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
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

/* Keep theme and the JS flag across ClientRouter swaps (the incoming document carries static defaults). */
document.addEventListener('astro:before-swap', (e) => {
  const nd = (e as unknown as { newDocument: Document }).newDocument.documentElement;
  nd.dataset.theme = root.dataset.theme;
  nd.classList.add('js');
});

/* ───────── Nav: scrolled state + sliding active indicator ───────── */
let nav: HTMLElement | null = null;
let indicator: HTMLElement | null = null;
let links: HTMLAnchorElement[] = [];
let sections: { id: string; el: HTMLElement }[] = [];
let activeId: string | null = null;
let indicatorShown = false;

function placeIndicator(id: string | null, immediate = false) {
  if (!indicator) return;
  const link = id ? links.find((l) => l.dataset.section === id) : undefined;
  if (!link) {
    if (indicatorShown) animate(indicator, { opacity: 0 }, { duration: 0.2, ease: EASE });
    indicatorShown = false;
    return;
  }
  const ul = link.closest('ul')!.getBoundingClientRect();
  const r = link.getBoundingClientRect();
  const pad = parseFloat(getComputedStyle(link).paddingLeft) || 0;
  const to = { x: r.left - ul.left + pad, scaleX: Math.max(1, r.width - pad * 2), opacity: 1 };
  const instant = immediate || !indicatorShown || reduced();
  animate(indicator, to, instant ? { duration: 0 } : { duration: 0.4, ease: EASE });
  indicatorShown = true;
}

function updateScrollState() {
  nav?.setAttribute('data-scrolled', String(scrollY > 16));
  if (!sections.length) return;
  const line = innerHeight * 0.4;
  let id: string | null = null;
  for (const s of sections) if (s.el.getBoundingClientRect().top <= line) id = s.id;
  if (id !== activeId) {
    activeId = id;
    links.forEach((l) => (l.dataset.section === id ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
    placeIndicator(id);
  }
}

let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => { ticking = false; updateScrollState(); });
}, { passive: true });
addEventListener('resize', () => placeIndicator(activeId, true));

/* ───────── Page setup (runs on first load and after every ClientRouter navigation) ───────── */
function setup() {
  nav = document.querySelector('[data-nav]');
  indicator = document.querySelector('[data-indicator]');
  links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-links] a[data-section]'));
  sections = ['work', 'experience', 'about']
    .map((id) => ({ id, el: document.getElementById(id) as HTMLElement | null }))
    .filter((s): s is { id: string; el: HTMLElement } => !!s.el);
  activeId = null;
  indicatorShown = false;
  syncToggleLabel();

  if (sections.length) updateScrollState();
  else {
    // Work detail pages: Work is the current section.
    const cur = links.find((l) => l.getAttribute('aria-current') === 'page');
    if (cur) placeIndicator(cur.dataset.section ?? null, true);
    nav?.setAttribute('data-scrolled', String(scrollY > 16));
  }

  // Card entrance: fade up 16px once as they enter view, staggered ~70ms within a row.
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (cards.length) {
    if (reduced()) cards.forEach((c) => c.removeAttribute('data-reveal'));
    else {
      const cols = matchMedia('(min-width: 768px)').matches ? 2 : 1;
      inView(cards, (el) => {
        const i = Number((el as HTMLElement).dataset.index ?? 0);
        animate(el, { opacity: [0, 1], y: [16, 0] }, { duration: 0.6, delay: (i % cols) * 0.07, ease: EASE });
      }, { amount: 0.15, margin: '0px 0px -6% 0px' });
    }
  }

  // Entrance is CSS-driven; drop the flag after it ends so returning to Home shows the final state.
  if (root.classList.contains('entrance')) setTimeout(() => root.classList.remove('entrance'), 1500);
}

document.addEventListener('astro:page-load', setup);
