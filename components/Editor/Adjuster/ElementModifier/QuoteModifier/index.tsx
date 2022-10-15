import * as React from "react";

import { useSelector } from "components/Editor/state";
import { stepUint, uint8 } from "lib/element/values";

const QuoteModifier: React.FC = () => {
  const id = useSelector(({ state }) => state.selectedElement);
  const element = useSelector(({ state }) =>
    state.elements.find((e) => e.id === id)
  );
  const modifyElement = useSelector(({ actions }) => actions.modifyElement);
  if (!element) return null;
  const quote = element?.value;
  if (quote?.type !== "quote") return null;
  return (
    <div>
      <div className="grid">
        {(["cx", "cy"] as const).map((prop) => (
          <React.Fragment key={prop}>
            <label>{prop}</label>
            <input
              type="range"
              min="0"
              max="250"
              value={quote[prop]}
              onChange={(e) =>
                modifyElement(element.id, {
                  ...quote,
                  [prop]: uint8(parseInt(e.target.value)),
                })
              }
            />
          </React.Fragment>
        ))}
        <label>size</label>
        <input
          type="range"
          min="0"
          max="500"
          value={quote.size.value()}
          onChange={(e) =>
            modifyElement(element.id, {
              ...quote,
              size: stepUint(parseInt(e.target.value), 2),
            })
          }
        />
        <label>rotate</label>
        <input
          type="range"
          min="0"
          max="360"
          value={quote.rotate.value()}
          onChange={(e) =>
            modifyElement(element.id, {
              ...quote,
              rotate: stepUint(parseInt(e.target.value), 3),
            })
          }
        />
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

export default QuoteModifier;
