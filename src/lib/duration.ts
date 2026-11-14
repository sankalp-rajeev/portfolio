/** Inclusive month count between 'YYYY-MM' values (or 'present' = the build month). May 2026 – Aug 2026 = "4 mos". */
export function duration(start: string, end: string, now = new Date()): string {
  const [sy, sm] = start.split('-').map(Number);
  const [ey, em] = end === 'present' ? [now.getFullYear(), now.getMonth() + 1] : end.split('-').map(Number);
  const months = (ey - sy) * 12 + (em - sm) + 1;
  const y = Math.floor(months / 12), m = months % 12;
  if (y === 0) return `${m} mo${m === 1 ? '' : 's'}`;
  return m === 0 ? `${y} yr${y === 1 ? '' : 's'}` : `${y} yr ${m} mo${m === 1 ? '' : 's'}`;
}
