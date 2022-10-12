import produce from "immer";
import { Point } from "lib/util";
import * as React from "react";

export const usePoints = ({ active }: { active: boolean }) => {
  const [points, setPoints] = React.useState<Point[]>([]);
  const push = React.useCallback(
    (p: Point) => {
      setPoints([...points, p]);
    },
    [points]
  );
  const clear = React.useCallback(() => {
    setPoints([]);
  }, []);
  if (!active && points.length > 0) clear();
  return {
    value: points,
    push,
    clear,
  };
};
