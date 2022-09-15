export const range = (i: number) => Array.from(Array(i).keys());

export const uint8 = (x: number) => Math.floor(Math.max(0, Math.min(x, 255)));

export type Point = { x: number; y: number };
