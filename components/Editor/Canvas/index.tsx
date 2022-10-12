import * as React from "react";

import { do_ } from "@seiyab/do-expr";

import { useSelector } from "components/Editor/state";
import SVGElem from "components/Editor/SVGElem";
import Selectable from "components/Editor/Selectable";
import { Point } from "lib/util";
import { localPosition } from "lib/react";
import { boundary } from "./boundaryElement";
import { Color } from "lib/element/color";
import { usePoints } from "./usePoints";
import { uint8 } from "lib/element/values";

const Canvas: React.FC = () => {
  const elements = useSelector(({ state }) => state.elements);
  const tool = useSelector(({ state }) => state.tool);
  const selectedToken = useSelector(({ state }) => state.selectedToken);
  const [startDrag, setStartDrag] = React.useState<Point | null>(null);
  const [cursor, setCursor] = React.useState<Point | null>(null);
  const points = usePoints({ active: tool === "polygon" });
  const [color, setColor] = React.useState<Color>(Color.random());
  const addElement = useSelector(({ actions }) => actions.addElement);
  const handleMouseDown: React.EventHandler<React.MouseEvent> = (e) => {
    if (!["rect", "ellipse", "quote"].includes(tool)) return;
    setStartDrag(localPosition(e));
  };
  const handleMouseMove: React.EventHandler<React.MouseEvent> = (e) => {
    setCursor(localPosition(e));
  };
  const handleMouseUp: React.EventHandler<React.MouseEvent> = (e) => {
    setCursor(null);
    if (startDrag === null) return;
    setStartDrag(null);
    setColor(Color.random());
    if (tool === "quote" && selectedToken !== null) {
      addElement(boundary.quote(startDrag, localPosition(e), selectedToken));
    }
    if (tool === "rect" || tool === "ellipse") {
      addElement(boundary[tool](startDrag, localPosition(e), color));
    }
  };
  const handleMouseLeave: React.EventHandler<React.MouseEvent> = () => {
    setStartDrag(null);
    setCursor(null);
  };
  const handleClick: React.EventHandler<React.MouseEvent> = (e) => {
    if (tool !== "polygon") return;
    points.push(localPosition(e));
  };
  return (
    <svg
      width="250"
      height="250"
      xmlns="http://www.w3.org/2000/svg"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-testid="canvas"
    >
      {elements.map(({ id, value }) => (
        <Selectable key={id} id={id}>
          <SVGElem value={value} />
        </Selectable>
      ))}
      {do_(() => {
        if (tool === "quote" && selectedToken !== null) {
          if (startDrag === null) return null;
          if (cursor === null) return null;
          return (
            <SVGElem value={boundary.quote(startDrag, cursor, selectedToken)} />
          );
        }
        if (tool === "rect" || tool === "ellipse") {
          if (startDrag === null) return null;
          if (cursor === null) return null;
          return <SVGElem value={boundary[tool](startDrag, cursor, color)} />;
        }
        if (tool === "polygon") {
          if (points.value.length === 0) return null;
          return (
            <>
              <SVGElem
                value={{
                  type: "polygon",
                  points: [
                    ...points.value.map(({ x, y }) => pair(uint8(x), uint8(y))),
                    ...(cursor ? [pair(uint8(cursor.x), uint8(cursor.y))] : []),
                  ],
                  fill: color,
                }}
              />
              <circle
                cx={points.value[0].x}
                cy={points.value[0].y}
                r={3}
                stroke={Color.stringify(color)}
                fill="#fff"
                onClick={(e) => {
                  e.stopPropagation();
                  points.clear();
                  addElement({
                    type: "polygon",
                    points: points.value.map(({ x, y }) =>
                      pair(uint8(x), uint8(y))
                    ),
                    fill: color,
                  });
                  setColor(Color.random());
                }}
              />
            </>
          );
        }
        return null;
      })}
      <style jsx>{`
        svg:hover {
          ${tool !== "cursor" ? "cursor: crosshair;" : ""}
        }
      `}</style>
    </svg>
  );
};

const pair = <T, U>(t: T, u: U): [T, U] => [t, u];

export default Canvas;
