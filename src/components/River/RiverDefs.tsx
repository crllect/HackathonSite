import { For, type Component } from "solid-js";

const TREE_TONES = [
  { leaf: "#5fbf5a", light: "#8ee07a" },
  { leaf: "#3f9e58", light: "#66c06e" },
  { leaf: "#79c94f", light: "#a9e276" },
  { leaf: "#f49ac1", light: "#ffc6dd" },
  { leaf: "#f29a4a", light: "#ffc27d" },
];

const CANOPY =
  "M-18 4A10 10 0 0 1-10-14A11 11 0 0 1 10-15A10 10 0 0 1 19 3A11 11 0 0 1 4 18A10 10 0 0 1-18 4Z";

export const RiverDefs: Component<{ water: string; height: number }> = (props) => (
  <defs>
    <linearGradient id="water-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={props.height}>
      <stop offset="0" stop-color="var(--water-top)" />
      <stop offset="0.55" stop-color="#5fb4e6" />
      <stop offset="1" stop-color="var(--water-deep)" />
    </linearGradient>

    <pattern id="grass-pattern" width="64" height="58" patternUnits="userSpaceOnUse">
      <path d="M8 14l3-6 3 6M38 40l3-6 3 6M52 12l2-5 2 5" fill="none" stroke="var(--land-deep)" stroke-width="2" stroke-linecap="round" />
      <circle cx="24" cy="30" r="1.6" fill="#fff6c9" />
      <circle cx="58" cy="50" r="1.4" fill="#ffd0e0" />
    </pattern>

    <pattern id="water-pattern" width="120" height="46" patternUnits="userSpaceOnUse">
      <path d="M10 14q7-6 14 0t14 0M70 36q6-5 12 0t12 0" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity="0.35" />
    </pattern>

    <clipPath id="water-clip">
      <path d={props.water} />
    </clipPath>

    <For each={TREE_TONES}>
      {(tone, index) => (
        <g id={`tree-${index()}`}>
          <ellipse cx="7" cy="9" rx="20" ry="18" fill="#1f3a2a" opacity="0.2" />
          <path d={CANOPY} fill={tone.leaf} stroke="var(--ink)" stroke-width="2.4" stroke-linejoin="round" />
          <ellipse cx="-5" cy="-6" rx="7" ry="5" fill={tone.light} opacity="0.85" />
          <circle cx="7" cy="5" r="2" fill={tone.light} opacity="0.8" />
        </g>
      )}
    </For>

    <g id="ripple">
      <path d="M-12 0q6-6 12 0t12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity="0.7" />
    </g>
  </defs>
);
