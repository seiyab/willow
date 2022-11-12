import * as React from "react";
import { useSelector } from "components/Editor/state";
import { encode } from "lib/encode/encoder";
import { web3, willow } from "lib/web3";
import Previewer from "components/Previewer";
import Frame from "components/Frame";

const Submit: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const elements = useSelector(({ state }) => state.elements);
  const clearElements = useSelector(({ actions }) => actions.clearElements);
  const submit = async () => {
    const wi = await willow();
    const accounts = await web3.eth.requestAccounts();
    await wi.create(encode(elements.map(({ value }) => value)), {
      from: accounts[0],
    });
    clearElements();
    setOpen(false);
  };
  return (
    <div className="root">
      <button
        type="button"
        aria-pressed={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        Submit
      </button>
      {open && (
        <div className="dropdown">
          <span>Preview via contract</span>
          <div>
            <Frame>
              <Previewer
                elements={elements.map(({ value }) => value)}
                size={200}
              />
            </Frame>
          </div>
          <div className="button-group">
            <button type="button" onClick={() => submit()}>
              Confirm
            </button>
            <button type="button" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <style jsx>{`
        .root {
          position: relative;
        }

        button {
          background-color: #555;
          color: #fff;
          padding: 6px;
          border-radius: 4px;
        }

        button[aria-pressed="true"] {
          background-color: #ddd;
        }

        .dropdown {
          align-items: center;
          animation-duration: 0.3s;
          animation-name: appear;
          background-color: #fff;
          box-shadow: 0 0 3px black;
          display: flex;
          flex-direction: column;
          padding: 20px;
          position: absolute;
          row-gap: 15px;
        }

        @keyframes appear {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 1;
          }
        }

        .button-group {
          display: inline-flex;
          column-gap: 15px;
        }
      `}</style>
    </div>
  );
};

export default Submit;
