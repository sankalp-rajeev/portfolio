// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output. The CRA build dir was `build/`; keeping it means the existing
// host's publish-directory setting (and `_redirects`) keep working unchanged.
export default defineConfig({
  site: 'https://sankalprajeev.dev',
  output: 'static',
  outDir: process.env.OUT_DIR || 'build',
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'always' },
  vite: { plugins: [tailwindcss()] },
});
