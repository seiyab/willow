import { promises as fs } from "fs";
import { WillowInstance } from "types/truffle-contracts";
import { bytes } from "lib/encode/bytes";
import { encode } from "lib/encode/encoder";
import { rgba } from "lib/element/color";
import { stepUint, uint8 } from "lib/element/values";
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
        bytes([0x01, 10, 30, 100, 150, 0xf0, 0x0f]),
        bytes([0x01, 100, 50, 200, 100, 0x0a, 0xaf]),
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
        cx: uint8(100),
        cy: uint8(50),
        rx: uint8(60),
        ry: uint8(30),
        fill: rgba(1, 2, 3, 4),
      }),
      encode<Ellipse>({
        type: "ellipse",
        cx: uint8(200),
        cy: uint8(150),
        rx: uint8(40),
        ry: uint8(80),
        fill: rgba(8, 7, 6, 5),
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
          x: uint8(50),
          y: uint8(50),
          width: uint8(150),
          height: uint8(150),
          fill: rgba(15, 0, 0, 15),
        }),
      ],
      { from: alice }
    );
    const rectID = await latestID();

    await contractInstance.create(
      [
        encode<Ellipse>({
          type: "ellipse",
          cx: uint8(125),
          cy: uint8(125),
          rx: uint8(80),
          ry: uint8(100),
          fill: rgba(0, 0, 15, 7),
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
          cx: uint8(175),
          cy: uint8(205),
          rotate: stepUint(45, 3),
          size: stepUint(124, 2),
        }),
        encode<Quote>({
          type: "quote",
          id: ellipseID,
          cx: uint8(75),
          cy: uint8(95),
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
            [uint8(0), uint8(250)],
            [uint8(125), uint8(60)],
            [uint8(125), uint8(190)],
            [uint8(250), uint8(0)],
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
