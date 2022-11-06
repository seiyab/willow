import Link from "next/link";
import * as React from "react";

type Props = {
  children?: never;
};

const Header: React.FC<Props> = () => {
  return (
    <header>
      <div>
        <Link href="/" className="link top">
          Willow
        </Link>
        <Link href="/gallery" className="link">
          Gallery
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
        div :global(.link) {
          color: #fff;
          text-decoration: none;
          font-size: 16px;
        }
        div :global(.top.link) {
          font-size: 24px;
        }
      `}</style>
    </header>
  );
};

export default Header;
