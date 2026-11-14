/** Contribution-graph geometry, shared by the server render (latest year) and the client (other years, built on demand). */
export const PITCH = 14; // 11px cell + 3px gap
export const CELL = 11;
export const COLS = 53;
export const W = COLS * PITCH - 3; // 739
export const TOP = 20; // room for month labels
export const H = TOP + 7 * PITCH - 3;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** One year in compact form: counts per day from Jan 1, and a string of levels (0-4) per day. */
export interface Compact { year: number; total: number; counts: number[]; levels: string }
type SnapshotYear = { year: number; total: number; weeks: (string | number)[][][] };

export function toCompact(y: SnapshotYear): Compact {
  const days = y.weeks.flat().sort((a, b) => String(a[0]).localeCompare(String(b[0])));
  return { year: y.year, total: y.total, counts: days.map((d) => d[1] as number), levels: days.map((d) => d[2]).join('') };
}

export const label = (c: Compact) => `${c.total.toLocaleString('en-US')} contribution${c.total === 1 ? '' : 's'} in ${c.year}`;

/** SVG markup for one year (cells + month labels) and the x of its last cell (for scrolling to the latest week). */
export function buildSvg(c: Compact): { html: string; lastX: number } {
  const start = Date.UTC(c.year, 0, 1);
  const dow0 = new Date(start).getUTCDay();
  let cells = '';
  let labels = '';
  let lastMonth = -1;
  let lastLabelX = -999;
  for (let i = 0; i < c.counts.length; i++) {
    const idx = dow0 + i;
    const wi = Math.floor(idx / 7);
    const dow = idx % 7;
    const d = new Date(start + i * 864e5);
    const iso = d.toISOString().slice(0, 10);
    cells += `<rect class="c l${c.levels[i]}" x="${wi * PITCH}" y="${TOP + dow * PITCH}" width="${CELL}" height="${CELL}" rx="2" data-d="${iso}" data-n="${c.counts[i]}"></rect>`;
    // a month label above the first week that contains the 1st of a new month (or the first week of the year)
    if (dow === 0 || i === 0) {
      const m = d.getUTCMonth();
      if (m !== lastMonth && wi < COLS - 2 && wi * PITCH - lastLabelX >= 36) { labels += `<text class="mo" x="${wi * PITCH}" y="12">${MONTHS[m]}</text>`; lastLabelX = wi * PITCH; }
      lastMonth = m;
    }
  }
  const lastWeek = Math.floor((dow0 + c.counts.length - 1) / 7);
  const html = `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="GitHub contribution graph for ${c.year}: ${label(c)}" focusable="false">${labels}${cells}</svg>`;
  return { html, lastX: lastWeek * PITCH + CELL };
}
