import { html } from "https://esm.sh/htm@3.1.1/react?deps=react@18.3.1";

/**
 * Uses the real exported SVGs for pixel accuracy.
 *
 * @param {'sm' | 'md'} [props.size]
 * @param {boolean} [props.compactDots] — dots only, no wordmark
 * @param {string} [props.className]
 */
export function ArrayLogo({ size = "md", compactDots = false, className = "" }) {
  const dims =
    size === "sm"
      ? { w: compactDots ? 16 : 78, h: 22 }
      : { w: compactDots ? 25 : 134, h: 37 };

  const src = compactDots ? "./assets/logo-dots.svg" : "./assets/logo-array.svg";

  return html`
    <img
      src=${src}
      width=${dims.w}
      height=${dims.h}
      alt=${compactDots ? "" : "array"}
      className=${`select-none ${className}`}
      draggable=${false}
      style=${{ display: "block" }}
    />
  `;
}
