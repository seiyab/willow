import { Color } from "./color";
import { StepUint, Uint8 } from "./values";

export type GraphicalElement = Quote | Rect | Ellipse | Polygon;
export type GraphicalElementType = GraphicalElement["type"];

export type Quote = {
  type: "quote";
  id: number; // is bigint better?;
  cx: Uint8;
  cy: Uint8;
  size: StepUint<2>;
  rotate: StepUint<3>;
};

export type Rect = {
  type: "rect";
  x: Uint8;
  y: Uint8;
  width: Uint8;
  height: Uint8;
  fill: Color;
  stroke: Color;
};

export type Ellipse = {
  type: "ellipse";
  cx: Uint8;
  cy: Uint8;
  rx: Uint8;
  ry: Uint8;
  fill: Color;
  stroke: Color;
};

export type Polygon = {
  type: "polygon";
  points: [Uint8, Uint8][];
  fill: Color;
};
