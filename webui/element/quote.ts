import { Encoder } from "webui/encode/encoder";
import { range } from "webui/util";

export type Quote = {
  id: number; // is bigint better?;
}

export const quote = ({id}: Quote): Encoder => {
  const encode = () => {
    let temp = id;
    const revAddr: number[] = [];
    range(256 / 8).forEach(() => {
      revAddr.push(temp % 256);
      temp = Math.floor(temp / 256);
    })
    return [
      0x00,
      ...revAddr.reverse(),
    ]
  }
  return { encode }
}