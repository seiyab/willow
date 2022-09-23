import { do_ } from "@seiyab/do-expr";
import { Element, Ellipse, Quote, Rect } from "lib/element";
import { range } from "lib/util";
import { bytes } from "./bytes";
import { color } from "./color";

export const encode = (e: Element): string => {
  const encoder = do_(() => {
    if (e.type === "rect") return rect(e);
    if (e.type === "ellipse") return ellipse(e);
    throw new Error();
  });
  return bytes(encoder.encode());
};

export type Encoder = {
  encode: () => number[];
};

export const quote = ({ id, dx, dy, rotate, scale }: Quote): Encoder => {
  const encode = () => {
    let temp = id;
    const revAddr: number[] = [];
    range(256 / 8).forEach(() => {
      revAddr.push(temp % 256);
      temp = Math.floor(temp / 256);
    });
    const ds = [dx, dy].map((d) => Math.floor((d + 250) / 2));
    const deg = rotate % 360;
    return [
      0x00,
      ...revAddr.reverse(),
      ...ds,
      deg % 256,
      scale + 256 * Math.floor(deg / 256),
    ];
  };
  return { encode };
};

export const rect = ({ x, y, width, height, fill, stroke }: Rect): Encoder => {
  const [f, s] = [color(fill), color(stroke)];
  const encode = () => [
    0x01,
    x,
    y,
    width,
    height,
    ...f.encode(),
    ...s.encode(),
  ];
  return {
    encode,
  };
};

export const ellipse = ({ cx, cy, rx, ry, fill, stroke }: Ellipse): Encoder => {
  const [f, s] = [color(fill), color(stroke)];
  const encode = () => [0x02, cx, cy, rx, ry, ...f.encode(), ...s.encode()];
  return {
    encode,
  };
};
