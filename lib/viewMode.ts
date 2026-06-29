export const VIEW_MODE_STORAGE_KEY = "portfolio-view";
export const VIEW_MODE_DESKTOP = "desktop";
export const MOBILE_MAX_WIDTH_PX = 767;

export const desktopHomeHref = "/?desktop=1";
export const nonDesktopHomeHref = "/about";

export function prefersDesktopView(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(VIEW_MODE_STORAGE_KEY) === VIEW_MODE_DESKTOP;
}

export function setDesktopViewPreference(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(VIEW_MODE_STORAGE_KEY, VIEW_MODE_DESKTOP);
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`).matches;
}
