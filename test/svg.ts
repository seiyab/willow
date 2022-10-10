import { promises as fs } from "fs";
import { WillowInstance } from "types/truffle-contracts";
import { bytes } from "lib/encode/bytes";
import { encode } from "lib/encode/encoder";
import { rgba } from "lib/element/color";
import { stepUint } from "lib/element/values";
import { Ellipse, Polygon, Quote, Rect } from "lib/element";

const Willow = artifacts.require("Willow");

contract("assert svg", ([alice, bob]) => {
  let contractInstance: WillowInstance;
  const latestID = async () =>
    (await (await contractInstance.length()).toNumber()) - 1;
  beforeEach(async () => {
    contractInstance = await Willow.deployed();
  });

  it("admin token", async () => {
    const svg = await contractInstance.draw(0);
    return assert.equal(
      svg,
      await fs.readFile(`${__dirname}/svgs/admin.svg`, { encoding: "utf-8" })
    );
  });

  it("rect", async () => {
    await contractInstance.create(
      [
        bytes([0x01, 10, 30, 100, 150, 0xf0, 0x0f, 0x00, 0x00]),
        bytes([0x01, 100, 50, 200, 100, 0x0a, 0xaf, 0x00, 0x00]),
      ],
      { from: alice }
    );
    const svg = await contractInstance.draw(await latestID());

    return assert.equal(
      svg,
      await fs.readFile(`${__dirname}/svgs/a.svg`, { encoding: "utf-8" })
    );
  });

  it("ellipse", async () => {
    await contractInstance.create([
      encode<Ellipse>({
        type: "ellipse",
        cx: 100,
        cy: 50,
        rx: 60,
        ry: 30,
        fill: rgba(1, 2, 3, 4),
        stroke: rgba(5, 6, 7, 8),
      }),
      encode<Ellipse>({
        type: "ellipse",
        cx: 200,
        cy: 150,
        rx: 40,
        ry: 80,
        fill: rgba(8, 7, 6, 5),
        stroke: rgba(4, 3, 2, 1),
      }),
    ]);

    const svg = await contractInstance.draw(await latestID());

    return assert.equal(
      svg,
      await fs.readFile(`${__dirname}/svgs/ellipses.svg`, { encoding: "utf-8" })
    );
  });

  it("quote", async () => {
    await contractInstance.create(
      [
        encode<Rect>({
          type: "rect",
          x: 50,
          y: 50,
          width: 150,
          height: 150,
          fill: rgba(15, 0, 0, 15),
          stroke: rgba(0, 0, 0, 0),
        }),
      ],
      { from: alice }
    );
    const rectID = await latestID();

    await contractInstance.create(
      [
        encode<Ellipse>({
          type: "ellipse",
          cx: 125,
          cy: 125,
          rx: 80,
          ry: 100,
          fill: rgba(0, 0, 15, 7),
          stroke: rgba(0, 0, 0, 0),
        }),
      ],
      { from: bob }
    );
    const ellipseID = await latestID();

    await contractInstance.create(
      [
        encode<Quote>({
          type: "quote",
          id: rectID,
          cx: 175,
          cy: 205,
          rotate: stepUint(45, 3),
          size: stepUint(124, 2),
        }),
        encode<Quote>({
          type: "quote",
          id: ellipseID,
          cx: 75,
          cy: 95,
          rotate: stepUint(90, 3),
          size: stepUint(124, 2),
        }),
      ],
      { from: alice }
    );

    const svg = await contractInstance.draw(await latestID());

    return assert.equal(
      svg,
      await fs.readFile(`${__dirname}/svgs/quote.svg`, { encoding: "utf-8" })
    );
  });

  it("polygon", async () => {
    await contractInstance.create(
      [
        encode<Polygon>({
          type: "polygon",
          fill: rgba(0x2, 0xf, 0xc, 0xf),
          points: [
            [0, 250],
            [125, 60],
            [125, 190],
            [250, 0],
          ],
        }),
      ],
      { from: alice }
    );
    const svg = await contractInstance.draw(await latestID());

    return assert.equal(
      svg,
      await fs.readFile(`${__dirname}/svgs/polygon.svg`, { encoding: "utf-8" })
    );
  });
});
