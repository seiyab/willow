import { Color } from "lib/element/color";

export const encodeColor = ({ r, g, b, a }: Color): [number, number] => [
  pack(r, g),
  pack(b, a),
];

const pack = (a: number, b: number): number => (a * 16 + b) % 256;
