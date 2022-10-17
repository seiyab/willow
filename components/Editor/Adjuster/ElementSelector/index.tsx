import * as React from "react";

import { useSelector } from "components/Editor/state";
import SVGElem from "components/Editor/SVGElem";

const ElementSelector: React.FC = () => {
  const selectedElement = useSelector(({ state }) => state.selectedElement);
  const elements = useSelector(({ state }) => state.elements);
  const selectElement = useSelector(({ actions }) => actions.selectElement);
  return (
    <div>
      <ul className="elements">
        {elements.map(({ id, value }) => (
          <li
            key={id}
            className={`element-li ${id === selectedElement ? "selected" : ""}`}
            onClick={() => selectElement(id)}
          >
            <svg
              className="element"
              width="30"
              height="30"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 250 250"
            >
              <SVGElem value={value} />
            </svg>
            <span>{`${value.type} #${id}`}</span>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .selected {
          background-color: #eee;
        }

        .element-li {
          display: flex;
          align-items: center;
          column-gap: 3px;
        }

        .element-li:hover {
          cursor: pointer;
        }

        .element-li + .element-li {
          margin-top: 2px;
        }

        .element {
          border: solid #aaa;
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
};

export default ElementSelector;
