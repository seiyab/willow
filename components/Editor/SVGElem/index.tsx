import { Element, Quote } from "lib/element";
import { Color } from "lib/element/color";
import { useDraw } from "lib/web3";

type Props = {
  value: Element;
};

const SVGElem: React.FC<Props> = ({ value: elem }) => {
  if (elem.type === "quote") {
    return <Quote quote={elem} />;
  }
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

const Quote: React.FC<{ quote: Quote }> = ({
  quote: { id, cx, cy, size, rotate },
}) => {
  const svg = useDraw(id);
  if (svg.isSuccess)
    return (
      <image
        href={`data:image/svg+xml;utf8,${svg.data}`}
        x={`-${Math.floor(size.value() / 2)}`}
        y={`-${Math.floor(size.value() / 2)}`}
        width={size.value()}
        height={size.value()}
        transform={`
          translate(${cx}, ${cy})
          rotate(${rotate.value()})
        `}
      />
    );
  return null;
};

export default SVGElem;
