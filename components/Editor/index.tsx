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
      <div className="flex-top center">
        <div>
          <div className="flex-center">
            <Submit />
          </div>
          <div className="flex-center canvas-container">
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
          <div className="quote-selector-container">
            <QuoteSelector />
          </div>
        </div>
        <div className="adjuster-container">
          <Adjuster />
        </div>
      </div>
      <style jsx>
        {`
          .flex-top {
            display: flex;
            align-items: top;
            justify-content: center;
          }
          .center {
            margin: 0 auto;
          }

          .canvas-container {
            margin-top: 10px;
          }

          .toolbox-container {
            margin-top: 10px;
          }

          .quote-selector-container {
            margin-top: 10px;
          }

          .adjuster-container {
            margin-left: 30px;
          }
        `}
      </style>
    </div>
  );
};

export default withState(Editor);
