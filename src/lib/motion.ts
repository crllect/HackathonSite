import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const COMPACT_QUERY = "(max-width: 819.98px)";

export const isCompact = () => window.matchMedia(COMPACT_QUERY).matches;
