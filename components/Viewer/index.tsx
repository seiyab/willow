import { do_ } from "@seiyab/do-expr";
import { usePromise } from "lib/swr";
import { willow } from "lib/web3";
import Image from "next/image";
import * as React from "react";

type Props = {
  id: number;
  size?: number;
};

const Viewer: React.FC<Props> = ({ id, size = 250 }) => {
  const p = usePromise(`willow.draw(${id})`, async () => {
    const wi = await willow();
    return await wi.draw(id);
  });
  if (p.isSuccess)
    return (
      <Image
        src={`data:image/svg+xml;utf8,${p.data}`}
        alt=""
        width={size}
        height={size}
      />
    );
  return (
    <>
      <span className="outer">
        <span className="inner" />
      </span>
      <style jsx>{`
        .outer {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: ${size}px;
          height: ${size}px;
        }
        .inner {
          display: inline-block;
          width: ${size}px;
          width: 40%;
          height: 40%;
          border: ${Math.ceil(size / 15)}px solid #ccc;
          border-radius: 50%;
          border-left: ${Math.ceil(size / 15)}px solid rgba(0, 0, 0, 0);
          animation: rot 1.5s infinite linear;
        }

        @keyframes rot {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(240deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Viewer;
