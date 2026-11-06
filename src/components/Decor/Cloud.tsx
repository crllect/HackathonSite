import type { Component, JSX } from "solid-js";

const OUTLINE = "M30 92C8 92 6 62 30 60C26 34 58 24 74 40C82 14 126 10 136 38C150 22 182 30 180 56C208 56 212 92 188 92Z";
const BELLY = "M18 80C60 90 150 90 204 80C202 88 196 92 188 92L30 92C24 92 20 87 18 80Z";

type CloudProps = { class?: string; style?: JSX.CSSProperties; ref?: (element: SVGSVGElement) => void; dir?: number };

export const Cloud: Component<CloudProps> = (props) => (
  <svg ref={props.ref} class={props.class} style={props.style} data-dir={props.dir} viewBox="0 0 220 100" aria-hidden="true">
    <path d={OUTLINE} fill="#fff" />
    <path d={BELLY} fill="#dcebfb" />
    <path d="M70 52q8-8 18-2M132 48q8-7 16 0" fill="none" stroke="#c4dcf5" stroke-width="4" stroke-linecap="round" />
    <path d={OUTLINE} fill="none" stroke="var(--ink)" stroke-width="4" stroke-linejoin="round" />
  </svg>
);

export const CloudShadow: Component<{ class?: string; style?: JSX.CSSProperties }> = (props) => (
  <svg class={props.class} style={props.style} viewBox="0 0 220 100" aria-hidden="true">
    <path d={OUTLINE} fill="#13304f" />
  </svg>
);
