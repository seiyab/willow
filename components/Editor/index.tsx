import * as React from "react";
import { withState } from "components/Editor/state";
import Canvas from "./Canvas";
import Toolbox from "./Toolbox/indx";
import Submit from "./Submit";
import Frame from "components/Frame";
import QuoteSelector from "./QuoteSelector";
import Adjuster from "./Adjuster";

const Editor: React.FC = () => {
  return (
    <div>
      <div className="upper">
        <div>
          <div>
            <Submit />
          </div>
          <div className="frame-container">
            <Frame>
              <Canvas />
            </Frame>
          </div>
          <div className="toolbox-container">
            <Toolbox />
          </div>
        </div>
        <div className="adjuster-container">
          <Adjuster />
        </div>
      </div>
      <div className="quote-selector-container">
        <QuoteSelector />
      </div>
      <style jsx>
        {`
          .upper {
            display: flex;
            justify-content: center;
          }

          .frame-container {
            margin-top: 10px;
          }

          .adjuster-container {
            margin-left: 20px;
          }

          .toolbox-container {
            margin-top: 10px;
            display: flex;
            justify-content: center;
          }

          .quote-selector-container {
            margin-top: 10px;
          }
        `}
      </style>
    </div>
  );
};

export default withState(Editor);
