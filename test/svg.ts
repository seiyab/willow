import { promises as fs } from "fs";
import { WillowInstance } from "types/truffle-contracts";
import { bytes } from "lib/encode/bytes";
import { ellipse, quote, rect } from "lib/encode/encoder";
import { rgba } from "lib/element/color";

const Willow = artifacts.require("Willow");

contract("assert svg", ([alice, bob]) => {
  let contractInstance: WillowInstance;
  beforeEach(async () => {
    contractInstance = await Willow.new();
  });
  it("rect", async () => {
    await contractInstance.create(
      [
        bytes([0x01, 10, 30, 100, 150, 0xf0, 0x0f, 0x00, 0x00]),
        bytes([0x01, 100, 50, 200, 100, 0x0a, 0xaf, 0x00, 0x00]),
      ],
      { from: alice }
    );
    const svg = await contractInstance.draw(0);

    return assert.equal(
      svg,
      await fs.readFile(`${__dirname}/svgs/a.svg`, { encoding: "utf-8" })
    );
  });

  it("ellipse", async () => {
    await contractInstance.create(
      [
        ellipse({
          type: "ellipse",
          cx: 100,
          cy: 50,
          rx: 60,
          ry: 30,
          fill: rgba(1, 2, 3, 4),
          stroke: rgba(5, 6, 7, 8),
        }),
        ellipse({
          type: "ellipse",
          cx: 200,
          cy: 150,
          rx: 40,
          ry: 80,
          fill: rgba(8, 7, 6, 5),
          stroke: rgba(4, 3, 2, 1),
        }),
      ]
        .map((e) => e.encode())
        .map(bytes)
    );

    const svg = await contractInstance.draw(0);

    return assert.equal(
      svg,
      await fs.readFile(`${__dirname}/svgs/ellipses.svg`, { encoding: "utf-8" })
    );
  });

  it("quote", async () => {
    await contractInstance.create(
      [
        rect({
          type: "rect",
          x: 50,
          y: 50,
          width: 150,
          height: 150,
          fill: rgba(15, 0, 0, 15),
          stroke: rgba(0, 0, 0, 0),
        }),
      ]
        .map((e) => e.encode())
        .map(bytes),
      { from: alice }
    );

    await contractInstance.create(
      [
        ellipse({
          type: "ellipse",
          cx: 125,
          cy: 125,
          rx: 80,
          ry: 80,
          fill: rgba(0, 0, 15, 7),
          stroke: rgba(0, 0, 0, 0),
        }),
      ]
        .map((e) => e.encode())
        .map(bytes),
      { from: bob }
    );

    await contractInstance.create(
      [quote({ type: "quote", id: 0 }), quote({ type: "quote", id: 1 })]
        .map((e) => e.encode())
        .map(bytes),
      { from: alice }
    );

    const svg = await contractInstance.draw(2);

    return assert.equal(
      svg,
      await fs.readFile(`${__dirname}/svgs/quote.svg`, { encoding: "utf-8" })
    );
  });
});
