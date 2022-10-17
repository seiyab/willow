import * as React from "react";
import { useSelector } from "components/Editor/state";

type Props = {
  id: string;
  children: React.ReactNode;
};

const Selectable: React.FC<Props> = ({ id, children }) => {
  const tool = useSelector(({ state }) => state.tool);
  const selectElement = useSelector(({ actions }) => actions.selectElement);
  const selectedElement = useSelector(({ state }) => state.selectedElement);
  const [g, setG] = React.useState<SVGGraphicsElement | null>(null);
  const handleClick = () => {
    if (tool !== "cursor") return;
    selectElement(id);
  };
  return (
    <>
      <g ref={setG} onClick={handleClick}>
        {children}
      </g>
      {selectedElement === id && g && (
        <rect
          {...boxProps(g)}
          strokeWidth="1"
          stroke="#000"
          strokeDasharray={"6"}
          fill="none"
        />
      )}
      <style jsx>{`
        g:hover {
          ${tool === "cursor" ? `cursor: pointer` : ""}
        }
      `}</style>
    </>
  );
};

const boxProps = (elem: SVGGraphicsElement) => {
  const box = elem.getBBox();
  const props: Record<string, unknown> = {};
  (["x", "y", "width", "height"] as const).forEach(
    (attr) => (props[attr] = box[attr])
  );
  return props;
};

export default Selectable;
