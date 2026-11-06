import { For, Show, type Component } from "solid-js";
import { schedule } from "~/content";
import styles from "./Sections.module.css";

const DOTS = ["var(--red)", "var(--orange)", "var(--yellow)", "var(--green)", "var(--cyan)", "var(--blue)", "var(--purple)"];

export const Schedule: Component = () => (
  <For each={schedule}>
    {(day) => (
      <div class={styles.day}>
        <h3 class={styles.dayLabel}>{day.label}</h3>
        <ol class={styles.timeline}>
          <For each={day.items}>
            {(item, index) => (
              <li style={{ "--dot": DOTS[index() % DOTS.length] }}>
                <time>{item.time}</time>
                <div>
                  <strong>{item.title}</strong>
                  <Show when={item.note}>{(note) => <span>{note()}</span>}</Show>
                </div>
              </li>
            )}
          </For>
        </ol>
      </div>
    )}
  </For>
);
