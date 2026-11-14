/**
 * Variant B, Paper Shaders (vanilla @paper-design/shaders, no React island).
 * A slow monochrome dithering field, two near-background tones with at most a trace of accent, very low contrast.
 * ShaderMount already pauses when off-screen / tab hidden; we cap DPR at 2 and freeze it when static.
 */
import { ShaderMount, ditheringFragmentShader, defaultPatternSizing, ShaderFitOptions, DitheringShapes, DitheringTypes, getShaderColorFromStringSafe } from './paper-shared';
import { onThemeChange, mix, readPalette, type Env, type Mount, type Palette } from './common';

const rgbCss = (c: [number, number, number]) => `rgb(${c[0]},${c[1]},${c[2]})`;

export const mount: Mount = (host, env: Env) => {
  let shader: ShaderMount | null = null;
  const holder = document.createElement('div');
  holder.style.cssText = 'position:absolute;inset:0;';
  host.appendChild(holder);

  const uniformsFor = (pal: Palette) => {
    const dark = pal.bg[0] < 128;
    // back = page bg; front = bg nudged toward text (very low contrast) with a ~5% hint of accent.
    const front = mix(mix(pal.bg, pal.line, dark ? 0.05 : 0.06), pal.accent, 0.05);
    return {
      u_colorBack: getShaderColorFromStringSafe(rgbCss(pal.bg)),
      u_colorFront: getShaderColorFromStringSafe(rgbCss(front)),
      u_shape: DitheringShapes.warp,
      u_type: DitheringTypes['4x4'],
      u_pxSize: 3,
      u_fit: ShaderFitOptions[defaultPatternSizing.fit],
      u_scale: 0.9,
      u_rotation: 0,
      u_offsetX: 0,
      u_offsetY: 0,
      u_originX: 0.5,
      u_originY: 0.5,
      u_worldWidth: 0,
      u_worldHeight: 0,
    };
  };

  const create = () => {
    const r = host.getBoundingClientRect();
    const px = Math.max(1, r.width * r.height * 4); // DPR cap 2
    shader?.dispose();
    shader = new ShaderMount(
      holder,
      ditheringFragmentShader,
      uniformsFor(readPalette()),
      undefined,
      env.static ? 0 : 0.12, // slow
      env.static ? 2400 : 0,
      1, // minPixelRatio
      px, // maxPixelCount => DPR <= 2
    );
  };
  create();
  const offTheme = onThemeChange(() => shader?.setUniforms(uniformsFor(readPalette())));
  return () => { offTheme(); shader?.dispose(); holder.remove(); };
};
