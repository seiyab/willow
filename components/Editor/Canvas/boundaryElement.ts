import { Ellipse, Quote, Rect } from "lib/element";
import { Color, rgba } from "lib/element/color";
import { stepUint, uint8 } from "lib/element/values";
import { Point } from "lib/util";

export const boundary = {
  quote(p1: Point, p2: Point, id: number): Quote {
    const cx = uint8((p1.x + p2.x) / 2);
    const cy = uint8((p1.y + p2.y) / 2);
    const width = uint8(Math.abs(p1.x - p2.x));
    const height = uint8(Math.abs(p1.y - p2.y));
    const size = stepUint(Math.sqrt(width * height), 2);
    return {
      type: "quote",
      id,
      cx,
      cy,
      size,
      rotate: stepUint(0, 3),
    };
  },
  rect(p1: Point, p2: Point, fill: Color): Rect {
    const x = uint8(Math.min(p1.x, p2.x));
    const y = uint8(Math.min(p1.y, p2.y));
    const width = uint8(Math.abs(p1.x - p2.x));
    const height = uint8(Math.abs(p1.y - p2.y));
    return {
      type: "rect",
      x,
      y,
      width,
      height,
      fill,
    };
  },
  ellipse(p1: Point, p2: Point, fill: Color): Ellipse {
    const cx = uint8((p1.x + p2.x) / 2);
    const cy = uint8((p1.y + p2.y) / 2);
    const rx = uint8(Math.abs(p1.x - p2.x) / 2);
    const ry = uint8(Math.abs(p1.y - p2.y) / 2);
    return {
      type: "ellipse",
      cx,
      cy,
      rx,
      ry,
      fill,
    };
  },
};
