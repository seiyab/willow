import { Point } from "lib/util";
import React from "react";

export const localPosition = <T extends Element>(
  e: React.MouseEvent<T>
): Point => {
  const rect = e.currentTarget.getBoundingClientRect();
  return {
    x: e.clientX - rect.x,
    y: e.clientY - rect.y,
  };
};
