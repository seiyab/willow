import { WillowInstance } from "types/truffle-contracts";
import { encode } from "lib/encode/encoder";
import { rgba } from "lib/element/color";
import { stepUint, uint8 } from "lib/element/values";
import { Ellipse, Polygon, Quote, Rect } from "lib/element";
import { id, range } from "lib/util";

const Willow = artifacts.require("Willow");

contract("measure gas cost", ([alice]) => {
  let wi: WillowInstance;
  const latestID = async () => (await (await wi.length()).toNumber()) - 1;
  beforeEach(async () => {
    wi = await Willow.deployed();
  });

  describe("rect", () => {
    it("1 rect", async () => {
      const tx = await wi.create(
        encode([
          id<Rect>({
            type: "rect",
            x: uint8(50),
            y: uint8(50),
            width: uint8(150),
            height: uint8(150),
            fill: rgba(15, 0, 0, 15),
          }),
        ]),
        { from: alice }
      );

      return assert.equal(tx.receipt.gasUsed, 199_949);
    });

    it("2 rects", async () => {
      const tx = await wi.create(
        encode([
          id<Rect>({
            type: "rect",
            x: uint8(50),
            y: uint8(50),
            width: uint8(150),
            height: uint8(150),
            fill: rgba(15, 0, 0, 15),
          }),
          id<Rect>({
            type: "rect",
            x: uint8(50),
            y: uint8(50),
            width: uint8(150),
            height: uint8(150),
            fill: rgba(15, 0, 0, 15),
          }),
        ]),
        { from: alice }
      );

      return assert.equal(tx.receipt.gasUsed, 204_107);
    });

    it("100 rects", async () => {
      const tx = await wi.create(
        encode(
          range(100).map((i) =>
            id<Rect>({
              type: "rect",
              x: uint8(i),
              y: uint8(i),
              width: uint8(1),
              height: uint8(1),
              fill: rgba(15, 0, 0, 15),
            })
          )
        ),
        { from: alice }
      );

      return assert.equal(tx.receipt.gasUsed, 1145927);
    });
  });

  it("1 ellipse", async () => {
    const tx = await wi.create(
      encode([
        id<Ellipse>({
          type: "ellipse",
          cx: uint8(125),
          cy: uint8(125),
          rx: uint8(100),
          ry: uint8(100),
          fill: rgba(15, 0, 0, 15),
        }),
      ]),
      { from: alice }
    );

    return assert.equal(tx.receipt.gasUsed, 207_414);
  });

  describe("quote", () => {
    let rect: number;
    before(async () => {
      await wi.create(
        encode([
          id<Rect>({
            type: "rect",
            x: uint8(50),
            y: uint8(50),
            width: uint8(150),
            height: uint8(150),
            fill: rgba(15, 0, 0, 15),
          }),
        ]),
        { from: alice }
      );

      rect = await latestID();
    });

    it("1 quote", async () => {
      const tx = await wi.create(
        encode([
          id<Quote>({
            type: "quote",
            id: rect,
            cx: uint8(125),
            cy: uint8(125),
            size: stepUint(100, 2),
            rotate: stepUint(0, 3),
          }),
        ]),
        { from: alice }
      );

      return assert.equal(tx.receipt.gasUsed, 237_184);
    });

    it("quote of quote", async () => {
      await wi.create(
        encode([
          id<Quote>({
            type: "quote",
            id: rect,
            cx: uint8(125),
            cy: uint8(125),
            size: stepUint(100, 2),
            rotate: stepUint(0, 3),
          }),
        ]),
        { from: alice }
      );

      const q = await latestID();

      const tx = await wi.create(
        encode([
          id<Quote>({
            type: "quote",
            id: q,
            cx: uint8(125),
            cy: uint8(125),
            size: stepUint(100, 2),
            rotate: stepUint(0, 3),
          }),
        ]),
        { from: alice }
      );

      return assert.equal(tx.receipt.gasUsed, 237_184);
    });
  });

  describe("polygon", async () => {
    it("3 points", async () => {
      const tx = await wi.create(
        encode([
          id<Polygon>({
            type: "polygon",
            points: [
              [uint8(100), uint8(100)],
              [uint8(150), uint8(150)],
              [uint8(100), uint8(150)],
            ],
            fill: rgba(15, 0, 0, 15),
          }),
        ]),
        { from: alice }
      );

      return assert.equal(tx.receipt.gasUsed, 215_787);
    });

    it("10 points", async () => {
      const tx = await wi.create(
        encode([
          id<Polygon>({
            type: "polygon",
            points: range(10).map((i) => [
              uint8(125 + 25 * Math.sin(i / 10)),
              uint8(125 + 25 * Math.cos(i / 10)),
            ]),
            fill: rgba(15, 0, 0, 15),
          }),
        ]),
        { from: alice }
      );

      return assert.equal(tx.receipt.gasUsed, 215_955);
    });

    it("100 points", async () => {
      const tx = await wi.create(
        encode([
          id<Polygon>({
            type: "polygon",
            points: range(100).map((i) => [
              uint8(125 + 25 * Math.sin(i / 100)),
              uint8(125 + 25 * Math.cos(i / 100)),
            ]),
            fill: rgba(15, 0, 0, 15),
          }),
        ]),
        { from: alice }
      );

      return assert.equal(tx.receipt.gasUsed, 374_512);
    });
  });

  describe("complex", () => {
    it("10 rects, 10 ellipses, 10 triangles, 3 quotes", async () => {
      await wi.create(
        encode([
          id<Polygon>({
            type: "polygon",
            points: range(6).map((i) => [
              uint8(125 + 25 * Math.sin(i / 6)),
              uint8(125 + 25 * Math.cos(i / 6)),
            ]),
            fill: rgba(0, 15, 0, 15),
          }),
        ]),
        { from: alice }
      );
      const hexagon = await latestID();

      const tx = await wi.create(
        encode([
          ...range(10).map((i) =>
            id<Rect>({
              type: "rect",
              x: uint8(i * 10),
              y: uint8(i * 10),
              width: uint8(1),
              height: uint8(1),
              fill: rgba(15, 0, 0, 15),
            })
          ),
          ...range(10).map((i) =>
            id<Ellipse>({
              type: "ellipse",
              cx: uint8(i * 10 + 100),
              cy: uint8(i * 10 + 100),
              rx: uint8(1),
              ry: uint8(1),
              fill: rgba(15, 0, 0, 15),
            })
          ),
          ...range(10).map((i) =>
            id<Polygon>({
              type: "polygon",
              points: range(8).map((j) => [
                uint8(125 + 25 * Math.sin(j / 8) + i * 2),
                uint8(125 + 25 * Math.cos(j / 8) + i * 2),
              ]),
              fill: rgba(0, 15, 0, 15),
            })
          ),
          ...range(3).map((i) =>
            id<Quote>({
              type: "quote",
              id: hexagon,
              cx: uint8(125),
              cy: uint8(125),
              size: stepUint(100, 2),
              rotate: stepUint(i * 30, 3),
            })
          ),
        ]),
        { from: alice }
      );

      return assert.equal(tx.receipt.gasUsed, 778_723);
    });
  });
});
