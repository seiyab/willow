import { do_ } from "@seiyab/do-expr";
import { GraphicalElement, Ellipse, Polygon, Quote, Rect } from "lib/element";
import { range } from "lib/util";
import { bytes } from "./bytes";
import { encodeColor } from "./color";

export const encode = <E extends GraphicalElement>(e: E): string => {
  const nums = do_(() => {
    if (e.type === "rect") return rect(e);
    if (e.type === "ellipse") return ellipse(e);
    if (e.type === "quote") return quote(e);
    if (e.type === "polygon") return polygon(e);
    throw new Error();
  });
  return bytes(nums);
};

type Encoder<T> = (t: T) => number[];

const quote: Encoder<Quote> = ({ id, cx, cy, rotate, size }) => {
  let temp = id;
  const revAddr: number[] = [];
  range(256 / 8).forEach(() => {
    revAddr.push(temp % 256);
    temp = Math.floor(temp / 256);
  });
  return [0x00, ...revAddr.reverse(), cx, cy, rotate.shrunk(), size.shrunk()];
};

const rect: Encoder<Rect> = ({ x, y, width, height, fill, stroke }) => {
  const [f, s] = [encodeColor(fill), encodeColor(stroke)];
  return [0x01, x, y, width, height, ...f, ...s];
};

const ellipse: Encoder<Ellipse> = ({ cx, cy, rx, ry, fill, stroke }) => {
  const [f, s] = [encodeColor(fill), encodeColor(stroke)];
  return [0x02, cx, cy, rx, ry, ...f, ...s];
};

const polygon: Encoder<Polygon> = ({ points, fill }) => {
  return [0x03, ...encodeColor(fill), ...points.flat()];
};
