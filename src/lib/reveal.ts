import { gsap, prefersReducedMotion, ScrollTrigger } from "./motion";

export const setupReveals = () => {
  if (prefersReducedMotion()) return () => undefined;

  const context = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    gsap.set(cards, { autoAlpha: 0, y: 56, scale: 0.94, rotation: () => gsap.utils.random(-4, 4) });
    ScrollTrigger.batch(cards, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, rotation: 0, duration: 0.9, ease: "back.out(1.6)", stagger: 0.1, overwrite: true }),
    });

    gsap.utils.toArray<SVGPathElement>("[data-scribble]").forEach((path) => {
      gsap.fromTo(
        path,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.9, ease: "power2.out", scrollTrigger: { trigger: path, start: "top 85%", once: true } },
      );
    });
  });

  return () => context.revert();
};
