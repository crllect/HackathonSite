import { For, type Component } from "solid-js";
import { event, openSponsorSlots, sponsors } from "~/content";
import styles from "./Sections.module.css";

const sponsorMail = `mailto:${event.contactEmail}?subject=${encodeURIComponent(`Sponsoring ${event.name}`)}`;

export const Sponsors: Component = () => (
  <div>
    <ul class={styles.sponsors}>
      <For each={sponsors}>
        {(sponsor) => (
          <li>
            <a class={styles.sponsor} href={sponsor.url} target="_blank" rel="noreferrer">
              <img src={sponsor.logo} alt={sponsor.name} loading="lazy" />
            </a>
          </li>
        )}
      </For>
      <For each={Array.from({ length: openSponsorSlots })}>
        {() => (
          <li>
            <a class={styles.openSlot} href={sponsorMail}>
              Your logo here
            </a>
          </li>
        )}
      </For>
    </ul>
    <p class={styles.note}>
      Want to help high schoolers build cool stuff? <a href={sponsorMail}>Sponsor {event.name}</a>.
    </p>
  </div>
);
