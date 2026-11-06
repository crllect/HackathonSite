import { createSignal } from "solid-js";
import type { RiverModel } from "./river";

export const FALCON_ANCHOR = 0.44;

const [river, setRiver] = createSignal<RiverModel>();
const [journey, setJourney] = createSignal<HTMLElement>();

export { river, setRiver, journey, setJourney };

export const anchorInJourney = () => {
  const container = journey();
  if (!container) return 0;
  return window.innerHeight * FALCON_ANCHOR - container.getBoundingClientRect().top;
};
