import * as React from "react";
import { useLength } from "lib/web3";
import { useSelector } from "components/Editor/state";
import Loading from "components/Loading";
import { range } from "lib/util";
import Frame from "components/Frame";
import Viewer from "components/Viewer";
import { do_ } from "@seiyab/do-expr";

const tokensPerPage = 5;

const QuoteSelector: React.FC = () => {
  const open = useSelector(({ state }) => state.tool === "quote");
  const setSelectedToken = useSelector(
    ({ actions }) => actions.setSelectedToken
  );
  const selectedToken = useSelector(({ state }) => state.selectedToken);
  const length = useLength();
  const [offset, setOffset] = React.useState(0);
  const handleOlder = () => {
    if (!length.isSuccess) return;
    setOffset((prev) =>
      do_(() => {
        const candidate = prev + tokensPerPage;
        if (candidate >= length.data) return prev;
        return candidate;
      })
    );
  };
  if (!open) return null;
  return (
    <div className="wrapper">
      {length.isSuccess ? (
        <>
          <ul>
            {range(
              Math.max(0, length.data - tokensPerPage - offset),
              length.data - offset
            )
              .reverse()
              .map((i) => (
                <li key={i}>
                  <button onClick={() => setSelectedToken(i)}>
                    <Frame color={i === selectedToken ? "#8af" : undefined}>
                      <Viewer id={i} size={100} />
                    </Frame>
                  </button>
                </li>
              ))}
          </ul>
          <div className="button-group">
            <button
              className="nav-button"
              disabled={offset === 0}
              onClick={() => setOffset(0)}
            >
              Latest
            </button>
            <button
              className="nav-button"
              disabled={offset + tokensPerPage >= length.data}
              onClick={handleOlder}
            >
              Older
            </button>
          </div>
        </>
      ) : (
        <Loading size={100} />
      )}
      <style jsx>{`
        ul {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          column-gap: 20px;
        }

        .button-group {
          margin-top: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          column-gap: 10px;
        }

        .nav-button {
          background-color: #555;
          color: #fff;
          padding: 6px;
          border-radius: 4px;
        }

        .nav-button[disabled] {
          background-color: #ddd;
        }
      `}</style>
    </div>
  );
};

export default QuoteSelector;
