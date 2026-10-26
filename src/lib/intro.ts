// The intro overlay plays on the homepage, once per browser session (and never with reduced motion).
// INTRO_SCRIPT runs in <head> before first paint and sets <html data-intro="play|skip">,
// which the overlay CSS and the hero timings key off, so nothing flashes.
export const INTRO_MS = 1350;

export const INTRO_SCRIPT = `try{var d=document.documentElement;if(location.pathname!=="/"||sessionStorage.getItem("bv-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.intro="skip"}else{sessionStorage.setItem("bv-intro","1");d.dataset.intro="play"}}catch(e){}`;

// How long hero animations should wait for the intro, in ms. Client only.
export function bootDelay(): number {
  return typeof document !== "undefined" && document.documentElement.dataset.intro === "play" ? INTRO_MS : 0;
}
