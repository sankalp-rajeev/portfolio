import { getEnv, type Mount } from './common';

/** Mounts the variant named on [data-hero-bg]. Variants are code-split so Home only ships the one it uses. */
export async function mountHeroBg() {
  (window as any).__heroBgDestroy?.();
  const host = document.querySelector<HTMLElement>('[data-hero-bg]');
  if (!host) return;
  const variant = host.dataset.heroBg;
  const mod: { mount: Mount } =
    variant === 'a' ? await import('./trace-gate')
    : variant === 'b' ? await import('./paper')
    : await import('./paths');
  if (!host.isConnected) return;
  const destroy = mod.mount(host, getEnv());
  (window as any).__heroBgDestroy = () => { destroy(); (window as any).__heroBgDestroy = null; };
}
