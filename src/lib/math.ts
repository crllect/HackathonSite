export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const mix = (from: number, to: number, t: number) => from + (to - from) * t;

export const damp = (rate: number, seconds: number) => 1 - Math.exp(-rate * seconds);

export const lerpAngle = (from: number, to: number, t: number) => {
  const delta = ((((to - from) % 360) + 540) % 360) - 180;
  return from + delta * t;
};

export const headingOf = (dx: number, dy: number) => (Math.atan2(dx, -dy) * 180) / Math.PI;

export const smoothstep = (t: number) => t * t * (3 - 2 * t);
