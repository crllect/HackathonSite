export const createRandom = (seed: number) => {
  let state = seed >>> 0;
  const next = () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const range = (min: number, max: number) => min + next() * (max - min);
  const chance = (probability: number) => next() < probability;
  const int = (max: number) => Math.floor(next() * max);
  return { next, range, chance, int };
};

export type Random = ReturnType<typeof createRandom>;

export type Octave = readonly [amplitude: number, period: number];

export const createWave = (random: Random, octaves: readonly Octave[]) => {
  const phases = octaves.map(() => random.range(0, Math.PI * 2));
  return (t: number) =>
    octaves.reduce((sum, [amplitude, period], index) => sum + amplitude * Math.sin(t / period + phases[index]), 0);
};
