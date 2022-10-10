import assert from "assert";
import { rgba } from "lib/element/color";
import { encodeColor } from "./color";

describe("rgba().encode()", () => {
  ([[rgba(1, 2, 3, 4), [0x12, 0x34]]] as const).forEach(([c, bytes]) => {
    it(JSON.stringify(c), () => {
      assert.deepEqual(encodeColor(c), bytes);
    });
  });
});
