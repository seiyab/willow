import * as React from "react";
import { useSelector } from "components/Editor/state";
import { encode } from "lib/encode/encoder";
import { useAccounts, useRequestACcounts, web3, willow } from "lib/web3";
import Previewer from "components/Previewer";
import Frame from "components/Frame";
import { do_ } from "@seiyab/do-expr";

const Submit: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const elements = useSelector(({ state }) => state.elements);
  const clearElements = useSelector(({ actions }) => actions.clearElements);
  const accounts = useAccounts();
  const request = useRequestACcounts();
  const submit = async () => {
    if (accounts.isSuccess && accounts.data.length > 0) {
      const wi = await willow();
      await wi.create(encode(elements.map(({ value }) => value)), {
        from: accounts.data[0],
      });
      clearElements();
    }
    setOpen(false);
  };
  React.useEffect(() => {
    if (open) {
      do_(async () => {
        try {
          await request();
        } catch (e) {
          console.error(e);
        }
      });
    }
  }, [open, request]);
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
            <button
              type="button"
              disabled={(accounts.data?.length ?? 0) === 0}
              onClick={() => submit()}
            >
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

        button[aria-pressed="true"],
        button[disabled] {
          background-color: #ddd;
        }

        button[disabled] {
          cursor: default;
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
