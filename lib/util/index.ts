export const range = (i: number, end?: number) => {
  const start = end === undefined ? 0 : i;
  const stop = end ?? i;
  return Array.from(Array(stop - start).keys()).map((x) => x + start);
};

export const uint8 = (x: number) => Math.floor(Math.max(0, Math.min(x, 255)));

export type Point = { x: number; y: number };

export type Override<Super, Sub> = Omit<Super, keyof Sub> & Sub;
