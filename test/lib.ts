import assert from "assert";
import { bytes } from "lib/encode/bytes";
import { color } from "lib/encode/color";
import { LibInstance } from "types/truffle-contracts";

const Lib = artifacts.require("Lib");

contract("lib", () => {
  let lib: LibInstance;
  beforeEach(async () => {
    lib = await Lib.new();
  });

  (
    [
      [
        color({ r: 0x1, g: 0x2, b: 0x3, a: 0x1 }),
        `rgba(${0x11},${0x22},${0x33},${(1 / 0xf).toFixed(3)})`,
      ],
      [
        color({ r: 0x5, g: 0x6, b: 0x7, a: 0xf }),
        `rgba(${0x55},${0x66},${0x77},1.0)`,
      ],
    ] as const
  ).forEach(([c, e]) => {
    it(e, async () => {
      const [x, y] = c.encode().map((b) => bytes([b]));
      assert.equal(await lib.colorString(x, y), e);
    });
  });
});
