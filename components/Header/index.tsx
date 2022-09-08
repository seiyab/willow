import * as React from "react";
import Style from "styled-jsx/style";

type Props = {
  children?: never;
};

const Header: React.FC<Props> = () => {
  return (
    <header>
      <div>Willow</div>
      <style jsx>{`
        header {
          background-color: #222;
          color: #fff;
        }
        div {
          margin: 0 auto;
          width: 800px;
        }
      `}</style>
    </header>
  );
};

export default Header;
