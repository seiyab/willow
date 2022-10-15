import * as React from "react";

import { useSelector } from "components/Editor/state";
import ElementSelector from "./ElementSelector";
import ElementModifier from "./ElementModifier";

const Adjuster: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="adjuster">
        <ElementSelector />
        <ElementModifier />
      </div>
      <style jsx>{`
        .wrapper {
          overflow-y: scroll;
          border: solid #aaa;
          border-radius: 3px;
          height: 300px;
        }
        .adjuster {
          display: flex;
          flex-direction: column;
          row-gap: 5px;
          width: 150px;
          padding: 3px;
          padding-bottom: 50px;
        }
      `}</style>
    </div>
  );
};

export default Adjuster;
