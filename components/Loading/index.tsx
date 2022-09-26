import * as React from "react";

type Props = {
  className?: string;
  size: number;
};

const Loading: React.FC<Props> = ({ className, size }) => (
  <div className={className}>
    <span className="outer">
      <span className="inner" />
    </span>
    <style jsx>{`
      .outer {
        display: flex;
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
  </div>
);

export default Loading;
