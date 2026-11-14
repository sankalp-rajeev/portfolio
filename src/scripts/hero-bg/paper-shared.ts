// Thin re-export layer so Vite code-splits the shader library into the Paper variant only.
export { ShaderMount, ditheringFragmentShader, defaultPatternSizing, ShaderFitOptions, DitheringShapes, DitheringTypes } from '@paper-design/shaders';

/** Parses `rgb(r,g,b)` into the 0–1 RGBA tuple the shaders expect (no external helper needed). */
export function getShaderColorFromStringSafe(s: string): [number, number, number, number] {
  const m = s.match(/\d+/g)!.map(Number);
  return [m[0] / 255, m[1] / 255, m[2] / 255, 1];
}
