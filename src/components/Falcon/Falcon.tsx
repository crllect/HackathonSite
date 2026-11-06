import type { Component } from "solid-js";
import styles from "./Falcon.module.css";

const WING = "M-12-8C-40-24-76-18-99 14C-86 13-75 14-65 18C-56 16-48 19-41 23C-31 21-21 23-12 22Z";
const WING_COVERT = "M-13-5C-38-19-68-15-88 7C-64-1-38-2-13 8Z";
const WING_TIPS = "M-99 14C-86 13-75 14-65 18";
const TAIL = "M-11 26L-17 56Q0 66 17 56L11 26Z";

const Wing = () => (
  <g data-wing>
    <path d={WING} fill="#5f72a0" />
    <path d={WING_COVERT} fill="#90a3cb" stroke="none" />
    <path d={WING_TIPS} fill="none" stroke="#2f3a59" stroke-width="5" />
    <path d={WING} fill="none" />
  </g>
);

const Eye = (props: { x: number }) => (
  <g transform={`translate(${props.x} -41)`}>
    <circle r="7.2" fill="#f6c445" />
    <ellipse rx="5" ry="5.6" fill="var(--ink)" stroke="none" />
    <circle cx="-2" cy="-2.4" r="1.9" fill="#fff" stroke="none" />
    <circle cx="1.6" cy="1.8" r="0.9" fill="#fff" stroke="none" />
  </g>
);

export const Falcon: Component<{ class?: string }> = (props) => (
  <svg class={props.class} viewBox="-100 -70 200 160" aria-hidden="true">
    <g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
      <path d={TAIL} fill="#56668c" />
      <path d="M-14 42Q0 48 14 42" fill="none" stroke="#3d4a6b" stroke-width="2.4" />
      <Wing />
      <g transform="scale(-1 1)">
        <Wing />
      </g>
      <ellipse cx="0" cy="6" rx="19" ry="27" fill="#5f72a0" />
      <path d="M-9 4q4 4 8 0M1 4q4 4 8 0M-4 16q4 4 8 0" fill="none" stroke="#3d4a6b" stroke-width="2" />
      <g class={styles.scarfTail}>
        <path d="M5-6C14 8 5 22 15 38L24 33C16 21 22 8 14-6Z" fill="var(--red)" />
      </g>
      <path d="M-18-13Q0-4 18-13L17-4Q0 5-17-4Z" fill="var(--red)" />
      <circle cx="0" cy="-30" r="25" fill="#45547a" />
      <path d="M-19-38Q-20-57 0-58Q20-57 19-38Q18-26 0-24Q-18-26-19-38Z" fill="#fdf3dc" />
      <path d="M-19-41Q-11-37-13-27Q-20-31-19-41ZM19-41Q11-37 13-27Q20-31 19-41Z" fill="#45547a" stroke-width="2" />
      <ellipse cx="-9" cy="-30" rx="3.6" ry="2.3" fill="#ff8fa3" stroke="none" opacity="0.8" />
      <ellipse cx="9" cy="-30" rx="3.6" ry="2.3" fill="#ff8fa3" stroke="none" opacity="0.8" />
      <Eye x={-8.5} />
      <Eye x={8.5} />
      <path d="M-5-52Q0-65 5-52Q0-48-5-52Z" fill="#f6c445" stroke-width="2.4" />
      <path d="M-1.6-59.5Q0-65 1.6-59.5Z" fill="var(--ink)" stroke-width="1.4" />
    </g>
  </svg>
);

export const FalconSilhouette: Component<{ class?: string }> = (props) => (
  <svg class={props.class} viewBox="-100 -70 200 160" aria-hidden="true">
    <g fill="#13304f">
      <g data-wing>
        <path d={WING} />
      </g>
      <g transform="scale(-1 1)">
        <g data-wing>
          <path d={WING} />
        </g>
      </g>
      <ellipse cx="0" cy="6" rx="19" ry="27" />
      <circle cx="0" cy="-30" r="25" />
      <path d={TAIL} />
    </g>
  </svg>
);
