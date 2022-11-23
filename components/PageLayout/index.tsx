import * as React from "react";
import css from "styled-jsx/css";

type Container = React.FC<{ className?: string; children: React.ReactNode }>;

const Wrapper: Container = ({ className, children }) => {
  return (
    <div className={className ?? ""}>
      {children}
      <style jsx>{`
        div {
          display: grid;
          grid-template-columns: 1fr minmax(max-content, 800px) 1fr;
        }
      `}</style>
    </div>
  );
};

const Row: Container = ({ className, children }) => {
  return (
    <div className={`${className ?? ""} row`}>
      <div className="column" />
      <div className="column">{children}</div>
      <div className="column" />
      <style jsx>{`
        .row {
          display: contents;
        }
        .column {
          background-color: inherit;
        }
      `}</style>
    </div>
  );
};

const header = css.resolve`
  * {
    background-color: #222;
  }
`;
const Header: Container = ({ className, children }) => {
  return (
    <Row className={`${className} ${header.className}`}>
      {children}
      {header.styles}
    </Row>
  );
};

const Content: Container = ({ className, children }) => {
  return <Row className={className}>{children}</Row>;
};

const PageLayout = {
  Wrapper,
  Header,
  Content,
};

export default PageLayout;
