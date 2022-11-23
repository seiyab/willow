import * as React from "react";

import { useSelector } from "components/Editor/state";
import SVGElem from "components/Editor/SVGElem";

const ElementSelector: React.FC = () => {
  const selectedElement = useSelector(({ state }) => state.selectedElement);
  const elements = useSelector(({ state }) => state.elements);
  const selectElement = useSelector(({ actions }) => actions.selectElement);
  const swapElements = useSelector(({ actions }) => actions.swapElements);
  const removeElement = useSelector(({ actions }) => actions.removeElement);
  const handleClickTop = (id: string) => () => {
    const i = elements.findIndex((e) => e.id === id);
    if (i < 0) return;
    swapElements(i, i - 1);
  };
  const handleClickBottom = (id: string) => () => {
    const i = elements.findIndex((e) => e.id === id);
    if (i < 0) return;
    swapElements(i, i + 1);
  };
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
            <div className="buttons">
              <button className="order-button-top" onClick={handleClickTop(id)}>
                <svg
                  width="10"
                  height="7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 10 7"
                >
                  <polygon points="0,7 10,7 5,0" fill="#555" />
                </svg>
              </button>
              <button
                className="order-button-bottom"
                onClick={handleClickBottom(id)}
              >
                <svg
                  width="10"
                  height="7"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 10 7"
                >
                  <polygon points="0,0 10,0 5,7" fill="#555" />
                </svg>
              </button>
            </div>
            <button onClick={() => removeElement(id)}>
              <svg
                width="10"
                height="10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 10"
              >
                <polyline stroke="#f00" strokeWidth="2" points="1,1 9,9" />
                <polyline stroke="#f00" strokeWidth="2" points="1,9 9,1" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <style jsx>{`
        svg {
          display: block;
        }

        .selected {
          background-color: #eee;
        }

        .element-li {
          display: flex;
          align-items: center;
          column-gap: 5px;
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

        .buttons {
          display: flex;
          flex-direction: column;
          row-gap: 4px;
        }

        .order-button-top {
          padding-top: 5px;
        }

        .order-button-bottom {
          padding-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default ElementSelector;
