import assert from "assert";
import { range } from "lib/util";
import { LibInstance } from "types/truffle-contracts";

const Lib = artifacts.require("Lib");

contract("lib", () => {
  let contractInstance: LibInstance;
  beforeEach(async () => {
    contractInstance = await Lib.new();
  });

  contract("scaleString", () => {
    it("should return expected string", async () => {
      assert.equal(await contractInstance.scaleString(128), "2.0000000");
      assert.equal(await contractInstance.scaleString(96), "1.0000000");
      assert.equal(await contractInstance.scaleString(64), "0.5000000");
      assert.equal(await contractInstance.scaleString(32), "0.2500000");

      // ~sqrt(2)
      assert.equal(
        await contractInstance.scaleString(96 + 32 / 2),
        "1.4141875"
      );
    });

    it("should approximate 2 ^ ((b - 96) / 32)", async () => {
      const eps = 0.0001;
      await Promise.all(
        range(10).map(async (i) => {
          const b = i * 10;
          const actual = parseFloat(await contractInstance.scaleString(b));
          const expected = Math.pow(2, (b - 96) / 32);
          assert.ok(
            actual + eps > expected,
            `actual (${actual}) + eps > expected (${expected}) is not satisfied`
          );
          assert.ok(
            actual - eps < expected,
            `actual (${actual}) - eps < expected (${expected}) is not satisfied`
          );
        })
      );
    });
  });
});
