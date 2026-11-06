import { For, onCleanup, onMount, type Component } from "solid-js";
import { Cloud, CloudShadow } from "./Cloud";
import { gsap, prefersReducedMotion } from "~/lib/motion";
import styles from "./SkyClouds.module.css";

const SKY = [
  { top: 14, left: -6, width: 280, lift: 0.5 },
  { top: 24, left: 82, width: 240, lift: 0.7 },
  { top: 37, left: -4, width: 220, lift: 0.4 },
  { top: 49, left: 86, width: 300, lift: 0.6 },
  { top: 62, left: -8, width: 260, lift: 0.8 },
  { top: 74, left: 80, width: 230, lift: 0.5 },
];

export const SkyClouds: Component = () => {
  const clouds: SVGSVGElement[] = [];

  onMount(() => {
    if (prefersReducedMotion()) return;
    const context = gsap.context(() => {
      clouds.forEach((cloud, index) => {
        const travel = SKY[index].lift * 320;
        gsap.fromTo(
          cloud,
          { y: travel },
          { y: -travel, ease: "none", scrollTrigger: { trigger: cloud, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    });
    onCleanup(() => context.revert());
  });

  return (
    <div class={styles.sky} aria-hidden="true">
      <For each={SKY}>
        {(cloud, index) => {
          const place = { top: `${cloud.top}%`, left: `${cloud.left}%`, "--cloud-width": `${cloud.width}px` };
          return (
            <>
              <CloudShadow class={styles.shadow} style={place} />
              <Cloud ref={(element) => (clouds[index()] = element)} class={styles.cloud} style={place} />
            </>
          );
        }}
      </For>
    </div>
  );
};
