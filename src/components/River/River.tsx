import { For, onCleanup, onMount, Show, type Component } from "solid-js";
import { riverPhoto, stops } from "~/content";
import { buildRiver, type StopLayout } from "~/lib/river";
import { river, setJourney, setRiver } from "~/lib/riverState";
import { isCompact, ScrollTrigger } from "~/lib/motion";
import { RiverDefs } from "./RiverDefs";
import { BridgeArt } from "./BridgeArt";
import { Floaters } from "./Floaters";
import styles from "./River.module.css";

const layoutTop = (element: HTMLElement, container: HTMLElement) => {
  let top = 0;
  let node: HTMLElement | null = element;
  while (node && node !== container) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
};

const measureStops = (container: HTMLElement): StopLayout[] =>
  stops.flatMap(({ id, side, landmark, bridge }) => {
    const section = document.getElementById(id);
    const card = section?.querySelector<HTMLElement>("[data-card]");
    if (!section || !card) return [];
    return [
      {
        id,
        side,
        landmark,
        bridge,
        top: layoutTop(section, container),
        height: section.offsetHeight,
        cardTop: layoutTop(card, container),
        cardHeight: card.offsetHeight,
      },
    ];
  });

const signatureOf = (width: number, height: number, layouts: StopLayout[]) =>
  [width, height, ...layouts.map((stop) => `${stop.top}:${stop.cardTop}:${stop.cardHeight}`)].join("|");

export const River: Component = () => {
  let root!: HTMLDivElement;

  onMount(() => {
    const container = root.parentElement;
    if (!container) return;
    setJourney(container);

    let frame = 0;
    let signature = "";

    const rebuild = () => {
      frame = 0;
      const layouts = measureStops(container);
      const width = container.clientWidth;
      const height = container.offsetHeight;
      const next = signatureOf(width, height, layouts);
      if (next === signature) return;
      const heightChanged = height !== river()?.height;
      signature = next;
      const hero = document.getElementById("top");
      setRiver(buildRiver({ width, height, heroHeight: hero?.offsetHeight ?? window.innerHeight, compact: isCompact(), stops: layouts }));
      if (heightChanged) ScrollTrigger.refresh();
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(rebuild);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(container);
    container.querySelectorAll("[data-card]").forEach((card) => observer.observe(card));
    document.fonts?.ready.then(schedule);
    rebuild();

    onCleanup(() => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    });
  });

  return (
    <div ref={root} class={styles.river} classList={{ [styles.withPhoto]: Boolean(riverPhoto) }} aria-hidden="true">
      <Show when={riverPhoto}>{(src) => <img class={styles.photo} src={src()} alt="" />}</Show>
      <Show when={river()}>
        {(model) => (
          <svg class={styles.svg} width={model().width} height={model().height} viewBox={`0 0 ${model().width} ${model().height}`}>
            <RiverDefs water={model().water} height={model().height} />
            <rect class={styles.land} width={model().width} height={model().height} />
            <rect class={styles.grass} width={model().width} height={model().height} fill="url(#grass-pattern)" />
            <For each={model().trails}>{(d) => <path class={styles.trail} d={d} />}</For>
            <path class={styles.shore} d={model().water} />
            <path class={styles.water} d={model().water} fill="url(#water-gradient)" />
            <path class={styles.water} d={model().water} fill="url(#water-pattern)" />
            <g clip-path="url(#water-clip)">
              <Floaters floaters={model().floaters} />
            </g>
            <For each={model().sketches}>{(d) => <path class={styles.sketch} d={d} />}</For>
            <For each={model().banks}>{(d) => <path class={styles.bank} d={d} />}</For>
            <For each={model().trees}>
              {(tree) => (
                <use
                  href={`#tree-${tree.variant}`}
                  transform={`translate(${tree.x.toFixed(1)} ${tree.y.toFixed(1)}) scale(${tree.scale.toFixed(2)})`}
                />
              )}
            </For>
            <For each={model().bridges}>{(bridge) => <BridgeArt bridge={bridge} />}</For>
          </svg>
        )}
      </Show>
    </div>
  );
};
