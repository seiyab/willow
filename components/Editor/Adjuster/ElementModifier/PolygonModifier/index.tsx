import * as React from "react";

import { useSelector } from "components/Editor/state";
import { uint8 } from "lib/element/values";
import produce from "immer";

const PolygonModifier: React.FC = () => {
  const id = useSelector(({ state }) => state.selectedElement);
  const element = useSelector(({ state }) =>
    state.elements.find((e) => e.id === id)
  );
  const modifyElement = useSelector(({ actions }) => actions.modifyElement);
  if (!element) return null;
  const polygon = element?.value;
  if (polygon?.type !== "polygon") return null;
  return (
    <div>
      <div className="grid">
        {polygon.points.map(([x, y], i) => (
          <React.Fragment key={i}>
            <label>x{i}</label>
            <input
              type="range"
              min="0"
              max="250"
              value={x}
              onChange={(e) =>
                modifyElement(
                  element.id,
                  produce(polygon, (draft) => {
                    draft.points[i][0] = uint8(parseInt(e.target.value));
                  })
                )
              }
            />
            <label>y{i}</label>
            <input
              type="range"
              min="0"
              max="250"
              value={y}
              onChange={(e) =>
                modifyElement(
                  element.id,
                  produce((draft) => {
                    draft.points[i][1] = uint8(parseInt(e.target.value));
                  })(polygon)
                )
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
              value={polygon.fill[prop]}
              onChange={(e) =>
                modifyElement(element.id, {
                  ...polygon,
                  fill: {
                    ...polygon.fill,
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

export default PolygonModifier;
