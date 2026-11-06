import { For, type Component } from "solid-js";
import { event, footerLinks } from "~/content";
import styles from "./Chrome.module.css";

export const Footer: Component = () => (
  <footer class={styles.footer}>
    <div class={styles.dock}>
      <span class={styles.perch} data-perch aria-hidden="true" />
      <p class={styles.made}>
        Made with <span class={styles.heart}>♡</span> by teenagers, for teenagers, at Hack Club.
      </p>
      <ul class={styles.links}>
        <For each={footerLinks}>
          {(link) => (
            <li>
              <a href={link.href}>{link.label}</a>
            </li>
          )}
        </For>
        <li>
          <a href={`mailto:${event.contactEmail}`}>{event.contactEmail}</a>
        </li>
      </ul>
      <p class={styles.small}>
        © {new Date().getFullYear()} {event.name}. Hack Club is a 501(c)(3) nonprofit.
      </p>
    </div>
  </footer>
);
