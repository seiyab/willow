import Content from "components/Content";
import Frame from "components/Frame";
import Header from "components/Header";
import Viewer from "components/Viewer";
import { usePromise } from "lib/swr";
import { range } from "lib/util";
import { web3, willow } from "lib/web3";
import * as React from "react";

const Gallery: React.FC = () => {
  const length = usePromise("willow.length()", async () => {
    const wi = await willow();
    return await (await wi.length()).toNumber();
  });
  console.error(length);
  return (
    <>
      <Header />
      <Content>
        <ul>
          {length.isSuccess &&
            range(Math.max(0, length.data - 5), length.data)
              .reverse()
              .map((i) => (
                <li key={i}>
                  <Frame>
                    <Viewer id={i} size={120} />
                  </Frame>
                </li>
              ))}
        </ul>
      </Content>
      <style jsx>{`
        ul {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
};

export default Gallery;
