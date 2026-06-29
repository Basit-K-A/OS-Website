const WEBRING_BASE = "https://webring.ca";

const LEAF_SVG =
  '<svg viewBox="2840 300 3920 4230" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width:1.6em;height:1.6em;vertical-align:-0.25em;fill:currentColor">' +
  '<path d="M4890 4430L4845 3567A95 95 0 0 1 4956 3469L5815 3620 5699 3300A65 65 0 0 1 5719 3227L6660 2465 6448 2366A65 65 0 0 1 6414 2287L6600 1715 6058 1830A65 65 0 0 1 5985 1792L5880 1545 5457 1999A65 65 0 0 1 5346 1942L5550 890 5223 1079A65 65 0 0 1 5132 1052L4800 400 4468 1052A65 65 0 0 1 4377 1079L4050 890 4254 1942A65 65 0 0 1 4143 1999L3720 1545 3615 1792A65 65 0 0 1 3542 1830L3000 1715 3186 2287A65 65 0 0 1 3152 2366L2940 2465 3881 3227A65 65 0 0 1 3901 3300L3785 3620 4644 3469A95 95 0 0 1 4755 3567L4710 4430Z"/>' +
  "</svg>";

const WEBRING_STYLES =
  ":host{display:block;font-size:var(--webring-size,1rem);color:var(--webring-color,inherit)}" +
  "nav{display:flex;align-items:center;justify-content:center;gap:0.5em}" +
  "a{color:var(--webring-color,inherit);text-decoration:none;transition:color 0.2s ease}" +
  "a:hover{color:var(--webring-accent,#AF272F)}" +
  ".arrow{font-size:0.9em;font-weight:700;line-height:1}" +
  ".leaf{display:inline-flex;align-items:center}";

function renderWebring(root: ShadowRoot | HTMLElement, slug: string | null, valid: boolean) {
  const style = document.createElement("style");
  style.textContent = WEBRING_STYLES;
  root.appendChild(style);

  const nav = document.createElement("nav");
  nav.setAttribute("aria-label", "webring.ca navigation");

  if (valid && slug) {
    const prev = document.createElement("a");
    prev.href = `${WEBRING_BASE}/prev/${slug}`;
    prev.target = "_top";
    prev.rel = "noopener";
    prev.className = "arrow";
    prev.textContent = "\u2190";
    nav.appendChild(prev);
  }

  const center = document.createElement("a");
  center.href = WEBRING_BASE;
  center.target = "_top";
  center.rel = "noopener";
  center.className = "leaf";
  center.innerHTML = LEAF_SVG;
  nav.appendChild(center);

  if (valid && slug) {
    const next = document.createElement("a");
    next.href = `${WEBRING_BASE}/next/${slug}`;
    next.target = "_top";
    next.rel = "noopener";
    next.className = "arrow";
    next.textContent = "\u2192";
    nav.appendChild(next);
  }

  root.appendChild(nav);
}

/** Mirrors https://webring.ca/embed.js for a specific host element. */
export function initWebringEmbed(el: HTMLElement) {
  if (el.shadowRoot) return;

  const slug = el.getAttribute("data-member");
  const valid = Boolean(slug && /^[a-z0-9-]+$/.test(slug));

  if (!valid) {
    console.warn("webring.ca embed: missing or invalid data-member attribute");
  }

  if (el.attachShadow) {
    const shadow = el.attachShadow({ mode: "open" });
    renderWebring(shadow, slug, valid);
  } else {
    renderWebring(el, slug, valid);
  }
}
