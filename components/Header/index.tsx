import Link from "next/link";
import * as React from "react";

type Props = {
  children?: never;
};

const Header: React.FC<Props> = () => {
  return (
    <header>
      <div>
        <Link href="/" passHref>
          <a className="link top">Willow</a>
        </Link>
        <Link href="/gallery">
          <a className="link">Gallery</a>
        </Link>
      </div>
      <style jsx>{`
        header {
          background-color: #222;
          color: #fff;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        div {
          display: flex;
          align-items: center;
          margin: 0 auto;
          width: 800px;
          column-gap: 15px;
        }
        .link {
          color: #fff;
          text-decoration: none;
          font-size: 16px;
        }
        .top.link {
          font-size: 24px;
        }
      `}</style>
    </header>
  );
};

export default Header;
