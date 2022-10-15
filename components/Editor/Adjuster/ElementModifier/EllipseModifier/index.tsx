import * as React from "react";

import { useSelector } from "components/Editor/state";
import { uint8 } from "lib/element/values";

const EllipseModifier: React.FC = () => {
  const id = useSelector(({ state }) => state.selectedElement);
  const element = useSelector(({ state }) =>
    state.elements.find((e) => e.id === id)
  );
  const modifyElement = useSelector(({ actions }) => actions.modifyElement);
  if (!element) return null;
  const ellipse = element?.value;
  if (ellipse?.type !== "ellipse") return null;
  return (
    <div>
      <div className="grid">
        {(["cx", "cy", "rx", "ry"] as const).map((prop) => (
          <React.Fragment key={prop}>
            <label>{prop}</label>
            <input
              type="range"
              min="0"
              max="250"
              value={ellipse[prop]}
              onChange={(e) =>
                modifyElement(element.id, {
                  ...ellipse,
                  [prop]: uint8(parseInt(e.target.value)),
                })
              }
            />
          </React.Fragment>
        ))}
        {(["r", "g", "b", "a"] as const).map((prop) => (
          <React.Fragment key={prop}>
            <label>{prop.toUpperCase()}</label>
            <input
              type="range"
              min="0"
              max="15"
              value={ellipse.fill[prop]}
              onChange={(e) =>
                modifyElement(element.id, {
                  ...ellipse,
                  fill: {
                    ...ellipse.fill,
                    [prop]: parseInt(e.target.value),
                  },
                })
              }
            />
          </React.Fragment>
        ))}
      </div>
      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: max-content auto;
          grid-gap: 2px;
        }
        label {
          text-align: right;
        }
        input {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default EllipseModifier;
