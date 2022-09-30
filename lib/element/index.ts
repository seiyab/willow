import { Color } from "./color";
import { StepUint } from "./values";

export type Element = Quote | Rect | Ellipse;
export type ElementType = Element["type"];

export type Quote = {
  type: "quote";
  id: number; // is bigint better?;
  cx: number;
  cy: number;
  size: StepUint<2>;
  rotate: StepUint<3>;
};

export type Rect = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  fill: Color;
  stroke: Color;
};

export type Ellipse = {
  type: "ellipse";
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  fill: Color;
  stroke: Color;
};
