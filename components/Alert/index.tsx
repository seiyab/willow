import * as React from "react";

type Props = {
  className?: string;
  children: React.ReactNode;
  type?: "info" | "error";
};

const Alert: React.FC<Props> = ({ className, children, type = "info" }) => {
  return (
    <div className={`${className} ${type}`} role="alert">
      {children}
      <style jsx>{`
        div {
          border: solid 1px #9cf;
          border-radius: 5px;
          background-color: #adf;
          color: #015;
          padding: 8px;
        }

        .error {
          background-color: #fbb;
          border: solid 1px #f88;
          color: #500;
        }
      `}</style>
    </div>
  );
};

export default Alert;
