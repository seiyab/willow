import * as React from "react";
import Web3 from "web3";
import contract from "@truffle/contract";
import { WillowInstance } from "types/truffle-contracts";
import { AsyncResult, usePromise } from "lib/swr";
import artifact from "build/contracts/Willow.json";
import { useSWRConfig } from "swr";

export const web3 = new Web3(Web3.givenProvider);

export const willow = async (): Promise<WillowInstance> => {
  const willowContract = contract(artifact);
  willowContract.setProvider(web3.currentProvider);
  return await willowContract.at("0x04caaA4842bc966c569C417E93481f2Bb9F59fB3");
};

export const useWillow = (): AsyncResult<WillowInstance> =>
  usePromise("willow", async () => {
    return await willow();
  });

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

export const useAccounts = (): AsyncResult<string[]> =>
  usePromise("web3.eth.getAccounts()", async () => {
    return await web3.eth.getAccounts();
  });

export const useRequestACcounts = (): (() => Promise<void>) => {
  const { mutate } = useSWRConfig();
  return React.useCallback(async () => {
    await web3.eth.requestAccounts();
    mutate("web3.eth.getAccounts()");
  }, [mutate]);
};
