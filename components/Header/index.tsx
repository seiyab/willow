import * as React from "react";

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
          font-size: 24px;
          padding-top: 10px;
          padding-bottom: 10px;
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
