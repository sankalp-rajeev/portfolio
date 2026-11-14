import { animate, inView } from 'motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const root = document.documentElement;
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

/* Keep theme and the JS flag across ClientRouter swaps (the incoming document carries static defaults). */
document.addEventListener('astro:before-swap', (e) => {
  const nd = (e as unknown as { newDocument: Document }).newDocument.documentElement;
  nd.dataset.theme = root.dataset.theme;
  nd.classList.add('js');
});

/* ───────── Top bar: scrolled state + shared sliding pill ───────── */
let bar: HTMLElement | null = null;
let pills: HTMLElement | null = null;
let overlay: HTMLElement | null = null;
let links: HTMLAnchorElement[] = [];
let sections: { id: string; el: HTMLElement }[] = [];
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
  for (const s of sections) if (s.el.getBoundingClientRect().top <= line) id = s.id;
  if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) id = sections[sections.length - 1].id;
  if (id !== activeId) {
    activeId = id;
    links.forEach((l) => (l.dataset.section === id ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
    movePill(id);
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

/* ───────── Page setup (first load and after every ClientRouter navigation) ───────── */
function setup() {
  bar = document.querySelector('[data-topbar]');
  pills = document.querySelector('[data-pills]');
  overlay = document.querySelector('[data-pill-overlay]');
  links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-pills] ul:not(.overlay) a[data-section]'));
  sections = ['about', 'experience', 'work', 'education']
    .map((id) => ({ id, el: document.getElementById(id) as HTMLElement | null }))
    .filter((s): s is { id: string; el: HTMLElement } => !!s.el);
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

  // Entrance is CSS-driven; drop the flag after it ends so returning to Home shows the final state.
  if (root.classList.contains('entrance')) setTimeout(() => root.classList.remove('entrance'), 1500);
}

document.addEventListener('astro:page-load', setup);
