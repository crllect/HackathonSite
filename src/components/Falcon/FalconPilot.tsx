import { onCleanup, onMount, type Component } from "solid-js";
import { Falcon, FalconSilhouette } from "./Falcon";
import { flight } from "~/lib/intro";
import { FALCON_ANCHOR, journey, river } from "~/lib/riverState";
import { gsap, prefersReducedMotion } from "~/lib/motion";
import { clamp, damp, headingOf, lerpAngle, mix } from "~/lib/math";
import styles from "./FalconPilot.module.css";

type Target = { x: number; y: number; perched: boolean; axis: number };

const SHADOW_OFFSET = { x: 38, y: 54 };

const PERCH_BAND = { top: 60, bottom: 0.75 };

const findPerch = (perches: HTMLElement[]) =>
  perches
    .map((perch) => perch.getBoundingClientRect())
    .map((box) => ({ x: box.left + box.width / 2, y: box.top + box.height / 2 }))
    .find(({ y }) => y > PERCH_BAND.top && y < window.innerHeight * PERCH_BAND.bottom);

const followTarget = (perches: HTMLElement[]): Target => {
  const anchorY = window.innerHeight * FALCON_ANCHOR;
  const perch = findPerch(perches);
  if (perch) return { ...perch, perched: true, axis: 0 };
  const model = river();
  const container = journey();
  if (!model || !container) return { x: window.innerWidth / 2, y: anchorY, perched: false, axis: 180 };
  const box = container.getBoundingClientRect();
  const localY = clamp(anchorY - box.top, 0, model.height);
  return {
    x: box.left + model.course.centerAt(localY),
    y: anchorY,
    perched: false,
    axis: headingOf(model.course.slopeAt(localY), 1),
  };
};

const alongAxis = (axis: number, current: number) =>
  Math.abs(lerpAngle(current, axis, 1) - current) <= 90 ? axis : axis + 180;

const createFlap = (wings: Element[]) => {
  gsap.set(wings, { transformOrigin: "100% 30%" });
  return gsap
    .timeline({ repeat: -1, yoyo: true })
    .to(wings, { scaleX: 0.45, rotation: -6, duration: 0.2, ease: "sine.inOut" });
};

export const FalconPilot: Component = () => {
  let pilot!: HTMLDivElement;
  let shadow!: HTMLDivElement;

  onMount(() => {
    const reduce = prefersReducedMotion();
    const perches = [...document.querySelectorAll<HTMLElement>("[data-perch]")];
    const wings = [...pilot.querySelectorAll("[data-wing]"), ...shadow.querySelectorAll("[data-wing]")];
    const flap = createFlap(wings);
    if (reduce) flap.pause(0.1);

    const pose = { x: flight.x, y: flight.y, angle: 90 };
    const last = { x: pose.x, y: pose.y + window.scrollY };
    let perched = false;
    let speed = 0;

    const setPerched = (next: boolean) => {
      if (next === perched) return;
      perched = next;
      if (perched) {
        flap.pause();
        gsap.to(wings, { scaleX: 0.38, rotation: -10, duration: 0.3, ease: "power2.out" });
      } else if (!reduce) {
        flap.play();
      }
    };

    const tick = (time: number, deltaMs: number) => {
      const seconds = Math.min(deltaMs, 64) / 1000 || 1 / 60;
      const target = followTarget(perches);
      const blend = flight.handoff;
      const goalX = mix(flight.x, target.x, blend);
      const goalY = mix(flight.y, target.y, blend);
      const follow = damp(blend < 1 ? 16 : target.perched ? 9 : 6, seconds);

      pose.x += (goalX - pose.x) * follow;
      pose.y += (goalY - pose.y) * follow;

      const worldY = pose.y + window.scrollY;
      const vx = (pose.x - last.x) / seconds;
      const vy = (worldY - last.y) / seconds;
      last.x = pose.x;
      last.y = worldY;
      speed = mix(speed, Math.hypot(vx, vy), damp(8, seconds));

      setPerched(blend >= 1 && target.perched);
      const heading = perched ? 0 : speed > 30 ? headingOf(vx, vy) : blend >= 1 ? alongAxis(target.axis, pose.angle) : pose.angle;
      pose.angle = lerpAngle(pose.angle, heading, damp(perched ? 10 : 5, seconds));

      if (!reduce && !perched) flap.timeScale(clamp(0.55 + speed / 700, 0.55, 2.4));

      const bob = reduce || perched ? 0 : Math.sin(time * 2.4) * 5;
      const transform = (dx: number, dy: number, scale: number) =>
        `translate3d(${(pose.x + dx).toFixed(1)}px, ${(pose.y + dy + bob).toFixed(1)}px, 0) rotate(${pose.angle.toFixed(1)}deg) scale(${scale})`;

      pilot.style.transform = transform(0, 0, perched ? 0.82 : 1);
      shadow.style.transform = transform(perched ? 6 : SHADOW_OFFSET.x, perched ? 10 : SHADOW_OFFSET.y - bob, perched ? 0.78 : 0.92);
    };

    gsap.ticker.add(tick);
    requestAnimationFrame(() => {
      pilot.classList.add(styles.ready);
      shadow.classList.add(styles.ready);
    });

    onCleanup(() => {
      gsap.ticker.remove(tick);
      flap.kill();
    });
  });

  return (
    <>
      <div ref={shadow} class={styles.shadow} aria-hidden="true">
        <FalconSilhouette class={styles.art} />
      </div>
      <div ref={pilot} class={styles.pilot} aria-hidden="true">
        <Falcon class={styles.art} />
      </div>
    </>
  );
};
