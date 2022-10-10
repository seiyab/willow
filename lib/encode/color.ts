import { Color } from "lib/element/color";
import { uint8, Uint8 } from "lib/element/values";

export const encodeColor = ({ r, g, b, a }: Color): [Uint8, Uint8] => [
  pack(r, g),
  pack(b, a),
];

const pack = (a: number, b: number): Uint8 => uint8(a * 16 + b);
