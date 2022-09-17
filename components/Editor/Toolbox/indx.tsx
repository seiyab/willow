import { useSelector } from "components/Editor/state";

const Toolbox: React.FC = () => {
  const tool = useSelector(({ state }) => state.tool);
  const setTool = useSelector(({ actions }) => actions.setTool);
  return (
    <div className="flex-center container">
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
