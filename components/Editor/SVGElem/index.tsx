import { Element } from "lib/element";
import { Color } from "lib/element/color";

type Props = {
  value: Element;
};

const SVGElem: React.FC<Props> = ({ value: elem }) => {
  if (elem.type === "rect") {
    return (
      <rect
        x={elem.x}
        y={elem.y}
        width={elem.width}
        height={elem.height}
        fill={Color.stringify(elem.fill)}
      />
    );
  }
  if (elem.type === "ellipse") {
    return (
      <ellipse
        cx={elem.cx}
        cy={elem.cy}
        rx={elem.rx}
        ry={elem.ry}
        fill={Color.stringify(elem.fill)}
      />
    );
  }
  return null;
};

export default SVGElem;
