import { WillowInstance } from "types/truffle-contracts";
import { rgba } from "lib/element/color";
import { do_ } from "@seiyab/do-expr";
import { encode } from "lib/encode/encoder";
import { Rect } from "lib/element";
import { uint8 } from "lib/element/values";

const Willow = artifacts.require("Willow");

contract("token", ([alice, bob]) => {
  let contractInstance: WillowInstance;
  const latestID = async () =>
    (await (await contractInstance.length()).toNumber()) - 1;
  beforeEach(async () => {
    contractInstance = await Willow.deployed();
  });

  it("owner", async () => {
    const ids: number[] = [];
    await contractInstance.create(payload, { from: alice });
    ids.push(await latestID());
    await contractInstance.create(payload, { from: bob });
    ids.push(await latestID());
    await contractInstance.create(payload, { from: alice });
    ids.push(await latestID());

    assert.equal(await contractInstance.ownerOf(ids[0]), alice);
    assert.equal(await contractInstance.ownerOf(ids[1]), bob);
    assert.equal(await contractInstance.ownerOf(ids[2]), alice);
  });

  it("tokenURI", async () => {
    await contractInstance.create(payload, { from: alice });
    const tokenURI = await contractInstance.tokenURI(await latestID());
    const { image } = fetch(tokenURI).json() as any;
    const svg = fetch(image).text();

    assert.equal(
      svg,
      '<svg width="250" height="250" xmlns="http://www.w3.org/2000/svg"><rect x="100" y="100" width="50" height="50" fill="rgba(255,0,0,1.0)" stroke="rgba(0,0,0,0)" /></svg>'
    );
  });
});

const payload = [
  encode<Rect>({
    type: "rect",
    x: uint8(100),
    y: uint8(100),
    width: uint8(50),
    height: uint8(50),
    fill: rgba(15, 0, 0, 15),
    stroke: rgba(0, 0, 0, 0),
  }),
];

const fetch = (uri: string) => {
  const [_schema, afterSchema] = split(uri).on(":");
  const [meta, data] = split(afterSchema).on(",");
  const base64 = meta.split(";").includes("base64");

  const text = do_(() => {
    if (base64) return Buffer.from(data, "base64").toString();
    return data;
  });
  return {
    json: () => JSON.parse(text) as unknown,
    text: () => text,
  };
};

const split = (s: string) => ({
  on: (c: string) => {
    const i = s.indexOf(c);
    if (i < 0) throw new Error();
    return [s.substring(0, i), s.substring(i + 1)];
  },
});
