import { createEffect, createSignal, onCleanup, onMount, type Component } from "solid-js";
import { event } from "~/content";
import { anchorInJourney, river } from "~/lib/riverState";
import styles from "./Chrome.module.css";

const SMOOT_NOTE = "1 smoot = 1.70 m, the height of Oliver Smoot, who MIT students used to measure the Harvard Bridge in 1958";

export const SmootMeter: Component = () => {
  const [smoots, setSmoots] = createSignal(0);
  const [place, setPlace] = createSignal("Leaving Cambridge");
  const [shown, setShown] = createSignal(false);

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? window.scrollY / max : 0;
    setSmoots(Math.round(progress * event.riverLengthSmoots));
    setShown(window.scrollY > window.innerHeight * 0.5);
    const model = river();
    if (!model) return;
    const here = anchorInJourney();
    const passed = model.landmarks.filter((landmark) => landmark.y <= here);
    setPlace(passed.at(-1)?.label ?? model.landmarks[0].label);
  };

  onMount(() => {
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    onCleanup(() => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    });
  });

  createEffect(() => {
    river();
    update();
  });

  return (
    <aside class={styles.meter} classList={{ [styles.shown]: shown() }} title={SMOOT_NOTE} aria-hidden="true">
      <strong>{smoots().toLocaleString()}</strong>
      <span>smoots downstream</span>
      <span class={styles.place}>{place()}</span>
    </aside>
  );
};
