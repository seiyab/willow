import Web3 from "web3";
import contract from "@truffle/contract";
import { WillowInstance } from "types/truffle-contracts";
import { AsyncResult, usePromise } from "lib/swr";

export const web3 = new Web3(Web3.givenProvider);

export const willow = async (): Promise<WillowInstance> => {
  const artifact = require("build/contracts/Willow.json");
  const willowContract = contract(artifact);
  willowContract.setProvider(web3.currentProvider);
  return await willowContract.deployed();
};

export const useLength = (): AsyncResult<number> =>
  usePromise("willow.length()", async () => {
    const wi = await willow();
    return await (await wi.length()).toNumber();
  });

export const useDraw = (id: number): AsyncResult<string> =>
  usePromise(`willow.draw(${id})`, async () => {
    const wi = await willow();
    return await wi.draw(id);
  });

export const usePreview = (data: string): AsyncResult<string> =>
  usePromise(`willow.preview(${data})`, async () => {
    const wi = await willow();
    return await wi.preview(data);
  });
