import { Color } from "lib/element/color";
import { Encoder } from "lib/encode/encoder";

export const color = ({ r, g, b, a }: Color): Encoder => ({
  encode: () => [pack(r, g), pack(b, a)],
});

export const rgba = (r: number, g: number, b: number, a: number): Color => ({
  r,
  g,
  b,
  a,
});

const pack = (a: number, b: number): number => (a * 16 + b) % 256;
