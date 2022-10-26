import { GraphicalElement, Ellipse, Polygon, Quote, Rect } from "lib/element";
import { uint8, Uint8 } from "lib/element/values";
import { range } from "lib/util";
import { bytes } from "./bytes";
import { encodeColor } from "./color";

export const encode = (elements: GraphicalElement[]): string => {
  const size = uint8(elements.length);
  if (size !== elements.length) throw new Error();
  return bytes([size, ...elements.flatMap(elementToBytes)]);
};

const elementToBytes = (e: GraphicalElement): number[] => {
  if (e.type === "rect") return rect(e);
  if (e.type === "ellipse") return ellipse(e);
  if (e.type === "quote") return quote(e);
  if (e.type === "polygon") return polygon(e);
  throw new Error();
};

type Encoder<T> = (t: T) => Uint8[];

const quote: Encoder<Quote> = ({ id, cx, cy, rotate, size }) => {
  let temp = id;
  const revAddr: number[] = [];
  range(256 / 8).forEach(() => {
    revAddr.push(temp % 256);
    temp = Math.floor(temp / 256);
  });
  return [
    0x00,
    ...revAddr.reverse(),
    cx,
    cy,
    rotate.shrunk(),
    size.shrunk(),
  ].map(uint8);
};

const rect: Encoder<Rect> = ({ x, y, width, height, fill }) => {
  return [uint8(0x01), x, y, width, height, ...encodeColor(fill)];
};

const ellipse: Encoder<Ellipse> = ({ cx, cy, rx, ry, fill }) => {
  return [uint8(0x02), cx, cy, rx, ry, ...encodeColor(fill)];
};

const polygon: Encoder<Polygon> = ({ points, fill }) => {
  const size = uint8(points.length);
  if (size !== points.length) throw new Error();
  return [uint8(0x03), size, ...encodeColor(fill), ...points.flat()];
};
