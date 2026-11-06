import { For, type Component } from "solid-js";
import { event, stops } from "~/content";
import styles from "./Chrome.module.css";

export const Nav: Component = () => (
  <>
    <a class={styles.flag} href="https://hackclub.com/">
      <img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="Hack Club" width="160" height="56" />
    </a>
    <nav class={styles.nav} aria-label="Sections">
      <For each={stops.filter((stop) => stop.navLabel)}>
        {(stop) => (
          <a class={styles.navLink} href={`#${stop.id}`}>
            {stop.navLabel}
          </a>
        )}
      </For>
      <a class="btn btn-small" href={event.signupUrl}>
        Sign up
      </a>
    </nav>
  </>
);
