import * as React from "react";
import { withState } from "components/Editor/state";
import Canvas from "./Canvas";
import Toolbox from "./Toolbox/indx";
import Submit from "./Submit";
import Frame from "components/Frame";

const Editor: React.FC = () => {
  return (
    <div>
      <div className="flex-center">
        <Submit />
      </div>
      <div className="flex-center">
        <div className="center">
          <Frame>
            <Canvas />
          </Frame>
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
