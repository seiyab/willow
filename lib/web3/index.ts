import Web3 from "web3";
import contract from "@truffle/contract";
import { WillowInstance } from "types/truffle-contracts";

export const web3 = new Web3(Web3.givenProvider);

export const willow = async (): Promise<WillowInstance> => {
  const artifact = require("build/contracts/Willow.json");
  const willowContract = contract(artifact);
  willowContract.setProvider(web3.currentProvider);
  return await willowContract.deployed();
};
