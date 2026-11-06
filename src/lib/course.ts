import { smoothstep } from "./math";

export type Waypoint = { y: number; x: number; half: number };

export type Point = readonly [x: number, y: number];

export type BankSide = -1 | 1;

export type Course = {
  centerAt: (y: number) => number;
  halfAt: (y: number) => number;
  slopeAt: (y: number) => number;
  bankAt: (y: number, side: BankSide) => number;
};

export const createCourse = (waypoints: readonly Waypoint[], meander: (y: number) => number): Course => {
  const points = [...waypoints].sort((a, b) => a.y - b.y);
  const first = points[0];
  const last = points[points.length - 1];

  const locate = (y: number) => {
    if (y <= first.y) return { a: first, b: first, t: 0 };
    if (y >= last.y) return { a: last, b: last, t: 0 };
    const index = points.findIndex((point) => point.y > y) - 1;
    const a = points[index];
    const b = points[index + 1];
    return { a, b, t: smoothstep((y - a.y) / (b.y - a.y)) };
  };

  const centerAt = (y: number) => {
    const { a, b, t } = locate(y);
    return a.x + (b.x - a.x) * t + meander(y);
  };

  const halfAt = (y: number) => {
    const { a, b, t } = locate(y);
    return a.half + (b.half - a.half) * t;
  };

  const slopeAt = (y: number) => (centerAt(y + 6) - centerAt(y - 6)) / 12;

  const bankAt = (y: number, side: BankSide) => centerAt(y) + side * halfAt(y) * Math.hypot(1, slopeAt(y));

  return { centerAt, halfAt, slopeAt, bankAt };
};

export const sampleLine = (from: number, to: number, step: number, xAt: (y: number) => number) => {
  const points: Point[] = [];
  for (let y = from; y < to; y += step) points.push([xAt(y), y]);
  points.push([xAt(to), to]);
  return points;
};

export const toPath = (points: readonly Point[], closed = false) =>
  points.map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join("") + (closed ? "Z" : "");
