/** Lightbox for /gallery: native <dialog>, keyboard (Esc, ←, →) and swipe support, focus returns to the thumbnail. */
export function initLightbox() {
  const dlg = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  const grid = document.querySelector('[data-gallery]');
  if (!dlg || !grid) return;
  const img = dlg.querySelector<HTMLImageElement>('[data-lb-img]')!;
  const cap = dlg.querySelector<HTMLElement>('[data-lb-caption]')!;
  const tiles = Array.from(grid.querySelectorAll<HTMLButtonElement>('.tile'));
  let i = 0;
  let opener: HTMLElement | null = null;

  const show = (n: number) => {
    i = (n + tiles.length) % tiles.length;
    const t = tiles[i];
    img.src = t.dataset.full ?? '';
    img.alt = t.dataset.caption ?? '';
    cap.textContent = t.dataset.caption ?? '';
    // Warm the neighbours so next/prev feel instant.
    [i + 1, i - 1].forEach((k) => { const n2 = tiles[(k + tiles.length) % tiles.length]; if (n2?.dataset.full) new Image().src = n2.dataset.full; });
  };
  const open = (n: number, from: HTMLElement) => { opener = from; show(n); if (!dlg.open) dlg.showModal(); };

  tiles.forEach((t, n) => t.addEventListener('click', () => open(n, t)));
  dlg.querySelector('[data-lb-close]')!.addEventListener('click', () => dlg.close());
  dlg.querySelector('[data-lb-prev]')!.addEventListener('click', () => show(i - 1));
  dlg.querySelector('[data-lb-next]')!.addEventListener('click', () => show(i + 1));
  dlg.addEventListener('close', () => opener?.focus());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
  });

  // Swipe: a mostly-horizontal drag past 50px moves to the next/previous photo.
  let sx = 0, sy = 0, down = false;
  const fig = dlg.querySelector('figure')!;
  fig.addEventListener('pointerdown', (e) => { down = true; sx = e.clientX; sy = e.clientY; });
  fig.addEventListener('pointerup', (e) => {
    if (!down) return; down = false;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(i + (dx < 0 ? 1 : -1));
  });
  fig.addEventListener('pointercancel', () => { down = false; });
}
