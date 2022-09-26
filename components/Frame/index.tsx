import * as React from "react";

type Props = {
  className?: string;
  color?: string;
  children: React.ReactNode;
};

const Frame: React.FC<Props> = ({ className, children, color = "#bbb" }) => {
  return (
    <>
      <div className={className}>{children}</div>
      <style jsx>{`
        div {
          border: inset 4px ${color};
        }
      `}</style>
    </>
  );
};

export default Frame;
