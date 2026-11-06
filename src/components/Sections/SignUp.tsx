import type { Component } from "solid-js";
import { event } from "~/content";
import styles from "./Sections.module.css";

export const SignUp: Component = () => (
  <div class={styles.signup}>
    <p class={styles.lead}>
      You made it to the harbor. Grab a laptop, bring a friend, and build something you're proud of.
    </p>
    <a class="btn" href={event.signupUrl}>
      Sign up for {event.name}
    </a>
    <p class={styles.note}>
      Free · {event.date} · {event.city}
    </p>
  </div>
);
