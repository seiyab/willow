import Content from "components/Content";
import Frame from "components/Frame";
import Header from "components/Header";
import Viewer from "components/Viewer";
import { range } from "lib/util";
import { useLength } from "lib/web3";
import * as React from "react";

const Gallery: React.FC = () => {
  const length = useLength();
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
