import { useSelector } from "components/Editor/state";

const Toolbox: React.FC = () => {
  const tool = useSelector(({ state }) => state.tool);
  const setTool = useSelector(({ actions }) => actions.setTool);
  return (
    <div className="flex-center container">
      <button
        className="cursor"
        onClick={() => setTool("cursor")}
        aria-label="cursor"
      >
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <g fill="#555" transform="rotate(-20, 15, 15)">
            <polygon
              points={`
                15, 5
                10, 20
                13, 20
                13, 25
                17, 25
                17, 20
                20,20
            `}
            />
          </g>
        </svg>
      </button>
      <button
        className="quote"
        onClick={() => setTool("quote")}
        aria-label="quote"
      >
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <g fill="#555">
            <rect x="8" y="9" width="6" height="6" />
            <polygon points="11,15 11,21 14,15" />
            <rect x="16" y="9" width="6" height="6" />
            <polygon points="19,15 19,21 22,15" />
          </g>
        </svg>
      </button>
      <button
        className="rect"
        onClick={() => setTool("rect")}
        aria-label="rect"
      >
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="18" height="18" fill="#555" />
        </svg>
      </button>
      <button
        className="ellipse"
        onClick={() => setTool("ellipse")}
        aria-label="ellipse"
      >
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="15" cy="15" rx="10" ry="10" fill="#555" />
        </svg>
      </button>
      <button
        className="polygon"
        onClick={() => setTool("polygon")}
        aria-label="polygon"
      >
        <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg">
          <polygon points="15,4 26,15 15,15 15,26 4,15" fill="#555" />
        </svg>
      </button>
      <style jsx>{`
        .container {
          border: 1px solid #ccc;
          border-radius: 3px;
        }

        button {
          padding: 0 4px;
        }

        button:hover {
          background-color: #ddd;
        }

        button.${tool} {
          background-color: #ddd;
        }
      `}</style>
    </div>
  );
};

export default Toolbox;
