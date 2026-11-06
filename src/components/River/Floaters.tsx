import { For, type Component, type JSX } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { Floater, FloaterKind } from "~/lib/river";
import styles from "./River.module.css";

const INK = { stroke: "var(--ink)", "stroke-width": 2, "stroke-linejoin": "round", "stroke-linecap": "round" } as const;

const Wake = () => (
  <path d="M-6 8l-10 20M6 8l10 20" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.6" />
);

const Duck = (props: { scale?: number; tone?: string }) => (
  <g transform={`scale(${props.scale ?? 1})`}>
    <Wake />
    <ellipse cx="0" cy="2" rx="7.5" ry="10.5" fill={props.tone ?? "#c8935f"} {...INK} />
    <path d="M-4 4q4 4 8 0" fill="none" stroke="var(--ink)" stroke-width="1.4" opacity="0.5" />
    <circle cx="0" cy="-9" r="5.6" fill={props.tone ? props.tone : "#2f8a5b"} {...INK} />
    <ellipse cx="0" cy="-15.5" rx="2.6" ry="2.4" fill="var(--orange)" {...INK} stroke-width="1.4" />
  </g>
);

const MamaDuck: Component = () => (
  <g class={styles.paddle}>
    <Duck />
  </g>
);

const Ducklings: Component = () => (
  <g class={styles.paddle}>
    <Duck />
    <For each={[0, 1, 2]}>
      {(index) => (
        <g transform={`translate(${index % 2 ? 6 : -6} ${26 + index * 16})`}>
          <Duck scale={0.55} tone="#ffd84d" />
        </g>
      )}
    </For>
  </g>
);

const ROWER_COLORS = ["var(--red)", "var(--blue)", "var(--red)", "var(--yellow)", "var(--red)", "var(--blue)", "var(--red)", "var(--green)"];

const Shell: Component = () => (
  <g class={styles.glide}>
    <path d="M0-62C5-40 5 40 0 62C-5 40-5-40 0-62Z" fill="#f4f0e6" {...INK} />
    <For each={ROWER_COLORS}>
      {(color, index) => {
        const y = -42 + index() * 11;
        const side = index() % 2 ? 1 : -1;
        return (
          <g transform={`translate(0 ${y})`}>
            <g
              class={styles.oar}
              style={{ "animation-delay": `${index() * 0.04}s`, "transform-origin": side > 0 ? "0% 0%" : "100% 0%" }}
            >
              <path d={`M0 0L${side * 30} 4`} stroke="var(--ink)" stroke-width="1.6" stroke-linecap="round" />
              <ellipse cx={side * 31} cy="4.4" rx="3.4" ry="1.8" fill="var(--paper)" {...INK} stroke-width="1.2" />
            </g>
            <circle r="3.4" fill={color} {...INK} stroke-width="1.4" />
          </g>
        );
      }}
    </For>
    <circle cy="50" r="3" fill="var(--yellow)" {...INK} stroke-width="1.4" />
  </g>
);

const Sail: Component = () => (
  <g class={styles.sway}>
    <ellipse cx="7" cy="9" rx="13" ry="20" fill="#163a5c" opacity="0.18" />
    <path d="M0-20C9-10 9 12 0 20C-9 12-9-10 0-20Z" fill="var(--paper)" {...INK} />
    <path d="M0-14L16 10L0 10Z" fill="var(--paper)" {...INK} />
    <path d="M0-14L-1 10" stroke="var(--ink)" stroke-width="2.4" stroke-linecap="round" />
    <path d="M3-6L11 6" stroke="var(--red)" stroke-width="2.4" stroke-linecap="round" />
  </g>
);

const Ripple: Component = () => (
  <g class={styles.shimmer}>
    <use href="#ripple" />
  </g>
);

const ART: Record<FloaterKind, Component> = {
  ripple: Ripple,
  duck: MamaDuck,
  ducklings: Ducklings,
  shell: Shell,
  sail: Sail,
};

export const Floaters: Component<{ floaters: Floater[] }> = (props) => (
  <For each={props.floaters}>
    {(floater): JSX.Element => (
      <g
        transform={`translate(${floater.x.toFixed(1)} ${floater.y.toFixed(1)}) rotate(${floater.angle.toFixed(1)}) scale(${floater.scale.toFixed(2)})`}
        style={{ "--delay": `${(-floater.delay).toFixed(2)}s` }}
      >
        <Dynamic component={ART[floater.kind]} />
      </g>
    )}
  </For>
);
