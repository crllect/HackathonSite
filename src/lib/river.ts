import { createCourse, sampleLine, toPath, type BankSide, type Course, type Waypoint } from "./course";
import { createRandom, createWave, type Random } from "./random";
import { clamp, headingOf } from "./math";
import type { BridgeKind, Side, StopMeta } from "~/content";

export type StopLayout = Pick<StopMeta, "id" | "side" | "landmark" | "bridge"> & {
  top: number;
  height: number;
  cardTop: number;
  cardHeight: number;
};

export type Bridge = { id: string; kind: BridgeKind; label: string; y: number; x1: number; x2: number; cx: number };

export type Landmark = { y: number; label: string };

export type Tree = { x: number; y: number; scale: number; variant: number };

export type FloaterKind = "ripple" | "duck" | "ducklings" | "shell" | "sail";

export type Floater = { kind: FloaterKind; x: number; y: number; angle: number; scale: number; delay: number };

export type RiverModel = {
  width: number;
  height: number;
  compact: boolean;
  course: Course;
  water: string;
  banks: string[];
  sketches: string[];
  trails: string[];
  bridges: Bridge[];
  landmarks: Landmark[];
  trees: Tree[];
  floaters: Floater[];
};

export type RiverInput = {
  width: number;
  height: number;
  heroHeight: number;
  compact: boolean;
  stops: StopLayout[];
  seed?: number;
};

export const TREE_VARIANTS = 5;

const SAMPLE_STEP = 8;

const cardInset = (stop: StopLayout) => Math.min(110, stop.cardHeight * 0.18);

const channelX = (side: Side, width: number, compact: boolean) => {
  if (compact || side === "center") return width * 0.5;
  return side === "left" ? width * 0.7 : width * 0.3;
};

const planWaypoints = ({ width, heroHeight, compact, stops }: RiverInput, baseHalf: number) =>
  stops.reduce<Waypoint[]>(
    (points, stop, index) => {
      const x = channelX(stop.side, width, compact);
      if (stop.side === "center") {
        return [
          ...points,
          { y: stop.top, x, half: baseHalf * 1.7 },
          { y: stop.cardTop + stop.cardHeight * 0.4, x, half: width },
        ];
      }
      const half = baseHalf * (1 + index * 0.14);
      return [
        ...points,
        { y: stop.cardTop + cardInset(stop), x, half },
        { y: stop.cardTop + stop.cardHeight - cardInset(stop), x, half },
      ];
    },
    [
      { y: -40, x: width * 0.5, half: baseHalf },
      { y: heroHeight * 0.75, x: width * 0.5, half: baseHalf },
    ],
  );

const bridgeY = (stop: StopLayout, compact: boolean) => (compact ? stop.top + 70 : stop.cardTop + cardInset(stop));

const placeBridge = (stop: StopLayout, course: Course, width: number, compact: boolean): Bridge[] => {
  if (!stop.bridge) return [];
  const y = bridgeY(stop, compact);
  const reach = 34;
  return [
    {
      id: stop.id,
      kind: stop.bridge,
      label: stop.landmark,
      y,
      x1: clamp(course.bankAt(y, -1) - reach, -12, width + 12),
      x2: clamp(course.bankAt(y, 1) + reach, -12, width + 12),
      cx: course.centerAt(y),
    },
  ];
};

const scatterTrees = (course: Course, width: number, height: number, random: Random) => {
  const trees: Tree[] = [];
  for (let y = 30; y < height; y += random.range(34, 66)) {
    for (const side of [-1, 1] as const) {
      if (!random.chance(0.8)) continue;
      const roll = random.next();
      const distance = roll < 0.3 ? random.range(10, 20) : roll < 0.85 ? random.range(60, 240) : random.range(240, 640);
      const x = course.bankAt(y, side) + side * distance;
      if (x < -30 || x > width + 30) continue;
      trees.push({ x, y: y + random.range(-14, 14), scale: random.range(0.75, 1.35), variant: random.int(TREE_VARIANTS) });
    }
  }
  return trees.sort((a, b) => a.y - b.y);
};

const scatterFloaters = (course: Course, width: number, height: number, heroHeight: number, random: Random) => {
  const floaters: Floater[] = [];
  const place = (kind: FloaterKind, y: number, spread: number, scale = 1, drift = true) => {
    const x = clamp(course.centerAt(y) + random.range(-spread, spread) * course.halfAt(y), 24, width - 24);
    const downstream = headingOf(course.slopeAt(y), 1);
    const angle = drift ? (random.chance(0.5) ? downstream : downstream + 180) : random.range(0, 360);
    floaters.push({ kind, x, y, angle, scale, delay: random.range(0, 6) });
  };
  const every = (from: number, to: number, min: number, max: number, run: (y: number) => void) => {
    for (let y = from; y < to; y += random.range(min, max)) run(y);
  };

  every(60, height - 40, 70, 130, (y) => place("ripple", y, 0.75, random.range(0.8, 1.3), false));
  every(heroHeight * 0.9, height * 0.8, 480, 760, (y) => place(random.chance(0.5) ? "duck" : "ducklings", y, 0.5));
  every(heroHeight * 1.1, height * 0.72, 650, 950, (y) => place("shell", y, 0.2));
  every(height * 0.55, height - 160, 170, 260, (y) => place("sail", y, 0.7, random.range(0.9, 1.2), false));
  return floaters;
};

export const buildRiver = (input: RiverInput): RiverModel => {
  const { width, height, heroHeight, compact, stops, seed = 7 } = input;
  const random = createRandom(seed);
  const baseHalf = compact ? width * 0.3 : clamp(width * 0.085, 72, 150);
  const meander = createWave(random, [
    [width * 0.02, 260],
    [width * 0.008, 110],
  ]);
  const course = createCourse(planWaypoints(input, baseHalf), meander);
  const jitter = (amplitude = 1) =>
    createWave(random, [
      [2.6 * amplitude, 31],
      [1.2 * amplitude, 9],
    ]);
  const edge = (side: BankSide, wobble: (y: number) => number, offset = 0) =>
    sampleLine(-40, height + 40, SAMPLE_STEP, (y) => course.bankAt(y, side) + side * offset + wobble(y));

  const left = edge(-1, jitter());
  const right = edge(1, jitter());

  return {
    width,
    height,
    compact,
    course,
    water: toPath([...left, ...[...right].reverse()], true),
    banks: [toPath(left), toPath(right)],
    sketches: [toPath(edge(-1, jitter(1.6), -3)), toPath(edge(1, jitter(1.6), -3))],
    trails: [toPath(edge(-1, createWave(random, [[7, 140]]), 40)), toPath(edge(1, createWave(random, [[7, 160]]), 40))],
    bridges: stops.flatMap((stop) => placeBridge(stop, course, width, compact)),
    landmarks: [
      { y: 0, label: "Leaving Cambridge" },
      ...stops.map((stop) => ({ y: stop.bridge ? bridgeY(stop, compact) - 80 : stop.top, label: stop.landmark })),
    ],
    trees: scatterTrees(course, width, height, random),
    floaters: scatterFloaters(course, width, height, heroHeight, random),
  };
};
