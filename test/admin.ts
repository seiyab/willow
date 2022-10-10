import { Rect } from "lib/element";
import { rgba } from "lib/element/color";
import { bytes } from "lib/encode/bytes";
import { encode } from "lib/encode/encoder";
import { range } from "lib/util";
import { WillowInstance } from "types/truffle-contracts";

const Willow = artifacts.require("Willow");
const Drawer = artifacts.require("Drawer");
const Repository = artifacts.require("Repository");
const Rect = artifacts.require("Rect");
const Token0Admin = artifacts.require("Token0Admin");

contract("admin", ([alice, bob, clara]) => {
  let willow: WillowInstance;
  const latestID = async () => (await (await willow.length()).toNumber()) - 1;
  beforeEach(async () => {
    willow = await Willow.deployed();
  });

  describe("addDecoder", () => {
    it("by administrator", async () => {
      const drawer = await Drawer.deployed();
      const rect = await Rect.new();
      await drawer.addDecoder(rect.address, { from: alice });
    });

    it("by non-administrator", async () => {
      const drawer = await Drawer.deployed();
      const rect = await Rect.new();
      await expectAsyncThrow(
        () => drawer.addDecoder(rect.address, { from: bob }),
        "addDecoder from bob should fail"
      );
    });
  });

  it("setMax", async () => {
    const repository = await Repository.deployed();
    for (const i of range(99)) {
      await willow.create(payload, { from: bob });
    }
    await expectAsyncThrow(
      () => willow.create(payload, { from: bob }),
      "create should fail exceeding max"
    );
    await expectAsyncThrow(
      () => willow.create(payload, { from: alice }),
      "create should fail exceeding max"
    );
    await expectAsyncThrow(
      () => repository.setMax(1_000, { from: bob }),
      "setMax from Bob should fail"
    );
    await expectAsyncThrow(
      () => willow.create(payload, { from: bob }),
      "create should fail exceeding max"
    );
    await repository.setMax(1_000, { from: alice });
    await willow.create(payload, { from: bob });
    assert.equal(await latestID(), 100);
  });

  it("transfer", async () => {
    const repository = await Repository.deployed();
    await expectAsyncThrow(
      () => willow.transferFrom(alice, bob, 0, { from: bob }),
      "transfer admin token from bob should fail"
    );
    await expectAsyncThrow(
      () => willow.transferFrom(alice, clara, 0, { from: clara }),
      "transfer admin token from clara should fail"
    );
    await willow.transferFrom(alice, bob, 0, { from: alice });
    await expectAsyncThrow(
      () => willow.transferFrom(bob, clara, 0, { from: clara }),
      "transfer admin token from clara should fail"
    );
    await repository.setMax(1_000, { from: bob });
    await willow.transferFrom(bob, clara, 0, { from: bob });
    await willow.transferFrom(clara, alice, 0, { from: clara });
  });

  it("should't accept setAdmin", async () => {
    const repository = await Repository.deployed();
    const t = await (await Token0Admin.new(willow.address)).address;
    await expectAsyncThrow(
      () => repository.setAdmin(t, { from: alice }),
      "setAdmin should fail"
    );
    await expectAsyncThrow(
      () => repository.setAdmin(t, { from: bob }),
      "setAdmin should fail"
    );
    await expectAsyncThrow(
      () => repository.setAdmin(t, { from: clara }),
      "setAdmin should fail"
    );
  });
});

const payload = [
  encode<Rect>({
    type: "rect",
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    fill: rgba(15, 0, 0, 15),
    stroke: rgba(0, 0, 0, 0),
  }),
];

const expectAsyncThrow = async (p: () => Promise<unknown>, message: string) => {
  try {
    await p();
  } catch (_) {
    return;
  }
  assert.fail(message);
};
