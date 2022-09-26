import * as React from "react";
import { useLength } from "lib/web3";
import { useSelector } from "components/Editor/state";
import Loading from "components/Loading";
import { range } from "lib/util";
import Frame from "components/Frame";
import Viewer from "components/Viewer";

const QuoteSelector: React.FC = () => {
  const open = useSelector(({ state }) => state.tool === "quote");
  const setSelectedToken = useSelector(
    ({ actions }) => actions.setSelectedToken
  );
  const selectedToken = useSelector(({ state }) => state.selectedToken);
  const length = useLength();
  if (!open) return null;
  return (
    <div className="wrapper">
      {length.isSuccess ? (
        <ul>
          {range(Math.max(0, length.data - 5), length.data)
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
      ) : (
        <Loading size={100} />
      )}
      <ul></ul>
      <style jsx>{`
        ul {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          column-gap: 20px;
        }
      `}</style>
    </div>
  );
};

export default QuoteSelector;
