import * as React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
};

const Alert: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={className}>
      {children}
      <style jsx>{`
        div {
          border: solid 1px #9cf;
          border-radius: 5px;
          background-color: #adf;
          color: #015;
          padding: 8px;
        }
      `}</style>
    </div>
  );
};

export default Alert;
