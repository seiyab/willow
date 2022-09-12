import { Color } from "./color";

export type Element = Quote | Rect | Ellipse;

export type Quote = {
  type: "quote";
  id: number; // is bigint better?;
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
  x: number;
  y: number;
  cx: number;
  cy: number;
  fill: Color;
  stroke: Color;
};
