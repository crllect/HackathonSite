import { For, type Component } from "solid-js";
import { venue } from "~/content";
import styles from "./Sections.module.css";

const MiniMap: Component = () => (
  <svg class={styles.map} viewBox="0 0 320 170" role="img" aria-label="Hand-drawn map: the venue sits on Broadway, a short walk from Harvard Square">
    <rect width="320" height="170" rx="16" fill="#d9f0c8" />
    <path d="M0 150C80 132 150 160 220 140S300 128 320 136V170H0Z" fill="var(--water-top)" stroke="var(--ink)" stroke-width="2.5" />
    <path d="M-10 74H330M150 -10V180M40 -10L250 180" stroke="#fff" stroke-width="12" stroke-linecap="round" />
    <path d="M-10 74H330M150 -10V180M40 -10L250 180" stroke="#cfc8b6" stroke-width="1.5" stroke-dasharray="6 6" />
    <path d="M60 180C90 130 120 110 150 104S210 70 230 -10" fill="none" stroke="var(--red)" stroke-width="6" stroke-linecap="round" />
    <g transform="translate(150 104)">
      <circle r="11" fill="#fff" stroke="var(--ink)" stroke-width="2.5" />
      <text class={styles.mapT} text-anchor="middle" dominant-baseline="central">T</text>
    </g>
    <text class={styles.mapLabel} x="166" y="126">Harvard</text>
    <text class={styles.mapLabel} x="12" y="64">Broadway</text>
    <text class={styles.mapLabel} x="90" y="162">Charles River</text>
    <g class={styles.pin} transform="translate(214 60)">
      <path d="M0 0C-14-16-14-34 0-34S14-16 0 0Z" fill="var(--red)" stroke="var(--ink)" stroke-width="2.5" />
      <circle cy="-22" r="5" fill="#fff" stroke="var(--ink)" stroke-width="2" />
    </g>
    <text class={styles.mapLabel} x="232" y="40">We're here!</text>
  </svg>
);

export const Location: Component = () => (
  <div class={styles.location}>
    <MiniMap />
    <h3 class={styles.venue}>{venue.name}</h3>
    <address class={styles.address}>
      <For each={venue.address}>{(line) => <span>{line}</span>}</For>
    </address>
    <p class={styles.note}>{venue.transit}</p>
    <a class="btn btn-small btn-paper" href={venue.mapUrl} target="_blank" rel="noreferrer">
      Open in maps
    </a>
  </div>
);
