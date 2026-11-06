import { For, onCleanup, onMount, Show, type Component } from "solid-js";
import { Cloud } from "~/components/Decor/Cloud";
import { event } from "~/content";
import { playIntro } from "~/lib/intro";
import { gsap } from "~/lib/motion";
import styles from "./Hero.module.css";

const BANK = [
  { left: 6, top: 30, width: 26, dir: -1 },
  { left: 26, top: 20, width: 30, dir: -1 },
  { left: 46, top: 32, width: 30, dir: 1 },
  { left: 66, top: 22, width: 28, dir: 1 },
  { left: -6, top: 54, width: 24, dir: -1 },
  { left: 80, top: 56, width: 24, dir: 1 },
];

const WORDS = [
  { text: "Rindge", tone: "var(--red)", perchAt: 1 },
  { text: "Hacks", tone: "var(--paper)", perchAt: -1 },
];

const SPARK_TONES = ["var(--yellow)", "#fff", "var(--red)", "var(--cyan)"];

export const Hero: Component = () => {
  let title!: HTMLHeadingElement;
  let sparks!: HTMLDivElement;
  const clouds: SVGSVGElement[] = [];
  const details: HTMLElement[] = [];

  const trail = (x: number, y: number) => {
    const spark = document.createElement("span");
    spark.className = styles.spark;
    spark.style.background = gsap.utils.random(SPARK_TONES);
    sparks.append(spark);
    gsap.fromTo(
      spark,
      { x, y, scale: gsap.utils.random(0.6, 1.2), rotation: 0 },
      {
        x: x - gsap.utils.random(20, 60),
        y: y + gsap.utils.random(10, 50),
        scale: 0,
        rotation: 180,
        duration: gsap.utils.random(0.7, 1.1),
        ease: "power1.out",
        onComplete: () => spark.remove(),
      },
    );
  };

  onMount(() => {
    const intro = playIntro({
      title,
      letters: [...title.querySelectorAll<HTMLElement>("[data-letter]")],
      clouds,
      details,
      onTrail: trail,
    });
    onCleanup(() => intro.kill());
  });

  return (
    <header id="top" class={styles.hero}>
      <div class={styles.bank} aria-hidden="true">
        <For each={BANK}>
          {(cloud, index) => (
            <Cloud
              ref={(element) => (clouds[index()] = element)}
              dir={cloud.dir}
              class={styles.cloud}
              style={{ left: `${cloud.left}%`, top: `${cloud.top}%`, "--cloud-width": `${cloud.width}vw` }}
            />
          )}
        </For>
      </div>

      <div class={styles.content}>
        <p ref={(element) => details.push(element)} class={styles.badge}>
          A Hack Club hackathon
        </p>
        <h1 ref={title} class={styles.title} aria-label={event.name}>
          <For each={WORDS}>
            {(word) => (
              <span class={styles.word} style={{ "--tone": word.tone }} aria-hidden="true">
                <For each={[...word.text]}>
                  {(letter, index) => (
                    <span data-letter class={styles.letter} style={{ "--wiggle": index() % 2 ? 3 : -3 }}>
                      {letter}
                      <Show when={index() === word.perchAt}>
                        <span class={styles.perch} data-perch />
                      </Show>
                    </span>
                  )}
                </For>
              </span>
            )}
          </For>
        </h1>
        <p ref={(element) => details.push(element)} class={styles.tagline}>
          {event.tagline}
        </p>
        <ul ref={(element) => details.push(element)} class={styles.meta}>
          <li>{event.date}</li>
          <li>{event.city}</li>
          <li>Free for high schoolers</li>
        </ul>
      </div>

      <a ref={(element) => details.push(element)} class={styles.cue} href="#schedule">
        Float down the Charles
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v15M5 13l7 7 7-7" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>

      <div ref={sparks} class={styles.sparks} aria-hidden="true" />
    </header>
  );
};
