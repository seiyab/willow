import * as React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Frame: React.FC<Props> = ({ className, children }) => {
  return (
    <>
      <div className={className}>{children}</div>
      <style jsx>{`
        div {
          border: inset 4px #bbb;
        }
      `}</style>
    </>
  );
};

export default Frame;
