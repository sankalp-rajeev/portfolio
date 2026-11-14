/** Keeps "self-healing" on one line. A real U+2011 glyph is missing from Geist (it would fall back to another face), so this uses nowrap instead. */
export const nb = (s: string) => s.replace(/self-healing/gi, (m) => `<span class="nb">${m}</span>`);
