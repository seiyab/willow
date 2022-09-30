import * as React from "react";
import { useSelector } from "components/Editor/state";
import SVGElem from "components/Editor/SVGElem";
import { Point } from "lib/util";
import { localPosition } from "lib/react";
import { boundary } from "./boundaryElement";
import { Color } from "lib/element/color";
import { do_ } from "@seiyab/do-expr";

const Canvas: React.FC = () => {
  const elements = useSelector(({ state }) => state.elements);
  const tool = useSelector(({ state }) => state.tool);
  const selectedToken = useSelector(({ state }) => state.selectedToken);
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
    setStartDrag(null);
    setColor(Color.random());
    if (tool === "quote" && selectedToken !== null) {
      addElement(boundary.quote(startDrag, localPosition(e), selectedToken));
    }
    if (tool === "rect" || tool === "ellipse") {
      addElement(boundary[tool](startDrag, localPosition(e), color));
    }
  };
  return (
    <svg
      width="250"
      height="250"
      xmlns="http://www.w3.org/2000/svg"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      data-testid="canvas"
    >
      {elements.map(({ id, value }) => (
        <SVGElem key={id} value={value} />
      ))}
      {do_(() => {
        if (startDrag === null) return null;
        if (currentDrag === null) return null;
        if (tool === "quote" && selectedToken !== null)
          return (
            <SVGElem
              value={boundary.quote(startDrag, currentDrag, selectedToken)}
            />
          );
        if (tool === "rect" || tool === "ellipse")
          return (
            <SVGElem value={boundary[tool](startDrag, currentDrag, color)} />
          );
        return null;
      })}
    </svg>
  );
};

export default Canvas;
