import * as React from "react";
import { useSelector, withState } from "components/Editor/state";
import Canvas from "./Canvas";
import Toolbox from "./Toolbox/indx";

const Editor: React.FC = () => {
  return (
    <div>
      <div className="flex-center">
        <div className="center">
          <Canvas />
        </div>
      </div>
      <div className="flex-center toolbox-container">
        <div className="center">
          <Toolbox />
        </div>
      </div>
      <style jsx>
        {`
          .center {
            margin: 0 auto;
          }

          .toolbox-container {
            margin-top: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default withState(Editor);
