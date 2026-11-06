import { gsap, prefersReducedMotion } from "./motion";
import { clamp } from "./math";

export const flight = { x: -240, y: 0, handoff: 0 };

type IntroTargets = {
  title: HTMLElement;
  letters: HTMLElement[];
  clouds: Element[];
  details: Element[];
  onTrail: (x: number, y: number) => void;
};

const partedX = (_: number, cloud: Element) => Number((cloud as HTMLElement).dataset.dir ?? 1) * 140;

const revealTitle = (title: HTMLElement) => {
  const box = title.getBoundingClientRect();
  const progress = clamp((flight.x - 30 - box.left) / box.width, 0, 1);
  title.style.clipPath = `inset(-40% calc(${((1 - progress) * 100).toFixed(2)}% - 8%) -40% -8%)`;
};

const partClouds = (clouds: Element[]) => gsap.set(clouds, { xPercent: partedX });

export const playIntro = ({ title, letters, clouds, details, onTrail }: IntroTargets) => {
  if (prefersReducedMotion() || window.scrollY > 40) {
    flight.handoff = 1;
    partClouds(clouds);
    return gsap.timeline();
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const box = title.getBoundingClientRect();
  const cruise = box.top + box.height * 0.5;
  let lastTrail = 0;

  Object.assign(flight, { x: -240, y: cruise + height * 0.16, handoff: 0 });
  title.style.clipPath = "inset(-40% 108% -40% -8%)";
  gsap.set(details, { autoAlpha: 0, y: 18 });

  const trail = () => {
    revealTitle(title);
    const now = performance.now();
    if (now - lastTrail < 45 || flight.x < 0 || flight.x > width) return;
    lastTrail = now;
    onTrail(flight.x - 40, flight.y + gsap.utils.random(-26, 26));
  };

  return gsap
    .timeline({ delay: 0.45, onUpdate: trail, onComplete: () => title.style.removeProperty("clip-path") })
    .to(flight, { x: width * 0.5, y: cruise - 8, duration: 1.05, ease: "sine.in" })
    .to(flight, { x: width + 260, y: cruise - height * 0.18, duration: 0.95, ease: "sine.out" })
    .to(
      clouds,
      { xPercent: partedX, yPercent: -12, scale: 0.92, duration: 1.5, ease: "power2.out", stagger: 0.07 },
      0.5,
    )
    .fromTo(
      letters,
      { y: 0 },
      { y: -18, duration: 0.18, ease: "power1.out", yoyo: true, repeat: 1, stagger: 0.045 },
      0.55,
    )
    .to(details, { autoAlpha: 1, y: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.12 }, 1.7)
    .to(flight, { handoff: 1, duration: 1.5, ease: "power2.inOut" }, 1.95);
};
