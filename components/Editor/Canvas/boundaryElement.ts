import { Ellipse, Rect } from "lib/element";
import { Color, rgba } from "lib/element/color";
import { Point, uint8 } from "lib/util";

export const boundary = {
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
      stroke: rgba(0, 0, 0, 0),
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
      stroke: rgba(0, 0, 0, 0),
    };
  },
};
