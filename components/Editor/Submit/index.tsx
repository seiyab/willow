import { useSelector } from "components/Editor/state";
import { encode } from "lib/encode/encoder";
import { web3, willow } from "lib/web3";

const Submit: React.FC = () => {
  const elements = useSelector(({ state }) => state.elements);
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
      }}
    >
      Submit
    </button>
  );
};

export default Submit;
