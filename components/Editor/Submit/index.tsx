import { useSelector } from "components/Editor/state";
import { encode } from "lib/encode/encoder";
import { web3, willow } from "lib/web3";

const Submit: React.FC = () => {
  const elements = useSelector(({ state }) => state.elements);
  const clearElements = useSelector(({ actions }) => actions.clearElements);
  return (
    <button
      type="button"
      onClick={async () => {
        const wi = await willow();
        const accounts = await web3.eth.requestAccounts();
        await wi.create(
          elements.map(({ value }) => encode(value)),
          { from: accounts[0] }
        );
        clearElements();
      }}
    >
      Submit
    </button>
  );
};

export default Submit;
