import { Ellipse, Quote, Rect } from "lib/element";
import { range } from "lib/util";
import { color } from "./color";

export type Encoder = {
  encode: () => number[];
};

export const quote = ({ id }: Quote): Encoder => {
  const encode = () => {
    let temp = id;
    const revAddr: number[] = [];
    range(256 / 8).forEach(() => {
      revAddr.push(temp % 256);
      temp = Math.floor(temp / 256);
    });
    return [0x00, ...revAddr.reverse()];
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
