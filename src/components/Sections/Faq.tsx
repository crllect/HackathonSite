import { For, Show, type Component } from "solid-js";
import { faqs } from "~/content";
import styles from "./Sections.module.css";

export const Faq: Component = () => (
  <div class={styles.faq}>
    <For each={faqs}>
      {(item) => (
        <details class={styles.question}>
          <summary>
            {item.question}
            <span class={styles.toggle} aria-hidden="true" />
          </summary>
          <p>
            {item.answer}
            <Show when={item.link}>
              {(link) => (
                <>
                  {" "}
                  <a href={link().href}>{link().label}</a>
                </>
              )}
            </Show>
          </p>
        </details>
      )}
    </For>
  </div>
);
