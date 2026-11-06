import type { Component, JSX } from "solid-js";
import type { StopMeta } from "~/content";
import styles from "./Stop.module.css";

type StopProps = { stop: StopMeta; index: number; children: JSX.Element };

export const Stop: Component<StopProps> = (props) => {
  const headingId = () => `${props.stop.id}-title`;
  return (
    <section id={props.stop.id} class={styles.stop} data-side={props.stop.side} aria-labelledby={headingId()}>
      <div class={styles.card} data-card data-reveal style={{ "--accent": props.stop.accent }}>
        <p class={styles.kicker}>
          <span class={styles.stopNumber}>Stop {props.index + 1}</span>
          {props.stop.landmark}
        </p>
        <h2 id={headingId()} class={styles.heading}>
          <span>{props.stop.title}</span>
          <svg class={styles.scribble} viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
            <path data-scribble pathLength="1" d="M4 13C60 4 120 18 180 9S270 6 296 12" />
          </svg>
        </h2>
        {props.children}
      </div>
    </section>
  );
};
