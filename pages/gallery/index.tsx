import * as React from "react";
import { do_ } from "@seiyab/do-expr";
import Frame from "components/Frame";
import Header from "components/Header";
import PageLayout from "components/PageLayout";
import Viewer from "components/Viewer";
import { range } from "lib/util";
import { useLength, useWillow } from "lib/web3";

const tokensPerPage = 6;

const Gallery: React.FC = () => {
  const length = useLength();
  const [offset, setOffset] = React.useState(0);
  const willow = useWillow();
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
  return (
    <PageLayout.Wrapper>
      <PageLayout.Header>
        <Header />
      </PageLayout.Header>
      <PageLayout.Content>
        <ul>
          {length.isSuccess &&
            range(
              Math.max(0, length.data - tokensPerPage - offset),
              length.data - offset
            )
              .reverse()
              .map((i) => (
                <li key={i}>
                  <Frame>
                    <Viewer id={i} size={300} />
                  </Frame>
                  <div className="description">
                    <span>token ID: {i}</span>
                    {willow.isSuccess && (
                      <span>
                        <a
                          href={`https://opensea.io/assets/ethereum/${willow.data.address}/${i}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View in OpenSea
                        </a>
                      </span>
                    )}
                  </div>
                </li>
              ))}
        </ul>
        <div className="buttons">
          <button disabled={offset === 0} onClick={() => setOffset(0)}>
            Latest
          </button>
          <button
            disabled={offset + tokensPerPage >= (length.data ?? 0)}
            onClick={handleOlder}
          >
            Older
          </button>
        </div>
      </PageLayout.Content>
      <style jsx>{`
        ul {
          display: flex;
          flex-direction: column;
          align-items: center;
          row-gap: 30px;
          margin-top: 30px;
        }

        li {
          display: block;
        }

        .description {
          margin-top: 5px;
          display: flex;
          flex-direction: column;
          align-items: left;
        }

        .buttons {
          display: flex;
          justify-content: center;
          column-gap: 30px;
          margin-top: 30px;
          margin-bottom: 60px;
        }

        button {
          background-color: #555;
          color: #fff;
          padding: 6px;
          border-radius: 4px;
        }

        button[disabled] {
          background-color: #ddd;
        }
      `}</style>
    </PageLayout.Wrapper>
  );
};

export default Gallery;
