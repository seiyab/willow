import * as React from "react";
import { useSelector } from "components/Editor/state";
import SVGElem from "components/Editor/SVGElem";
import { Point } from "lib/util";
import { localPosition } from "lib/react";
import { boundary } from "./boundaryElement";
import { Color } from "lib/element/color";

const Canvas: React.FC = () => {
  const elements = useSelector(({ state }) => state.elements);
  const tool = useSelector(({ state }) => state.tool);
  const [startDrag, setStartDrag] = React.useState<Point | null>(null);
  const [currentDrag, setCurrentDrag] = React.useState<Point | null>(null);
  const [color, setColor] = React.useState<Color>(Color.random());
  const addElement = useSelector(({ actions }) => actions.addElement);
  const handleMouseDown: React.EventHandler<React.MouseEvent> = (e) => {
    setStartDrag(localPosition(e));
    setCurrentDrag(null);
  };
  const handleMouseMove: React.EventHandler<React.MouseEvent> = (e) => {
    setCurrentDrag(localPosition(e));
  };
  const handleMouseUp: React.EventHandler<React.MouseEvent> = (e) => {
    setCurrentDrag(null);
    if (startDrag === null) return;
    if (tool !== "rect" && tool !== "ellipse") return;
    addElement(boundary[tool](startDrag, localPosition(e), color));
    setStartDrag(null);
    setColor(Color.random());
  };
  return (
    <svg
      width="250"
      height="250"
      xmlns="http://www.w3.org/2000/svg"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {elements.map(({ id, value }) => (
        <SVGElem key={id} value={value} />
      ))}
      {startDrag !== null &&
        currentDrag !== null &&
        (tool === "rect" || tool === "ellipse") && (
          <SVGElem value={boundary[tool](startDrag, currentDrag, color)} />
        )}
    </svg>
  );
};

export default Canvas;
