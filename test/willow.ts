import { promises as fs } from 'fs'
import { bytes } from "webui/util/bytes";

const Willow = artifacts.require("Willow");

contract("Willow", function ([alice]) {
  it("assert svg", async () => {
    const contractInstance = await Willow.deployed();
    const i = await contractInstance.create(
      [
        bytes([0x01, 10, 30, 100, 150, 0xf0, 0x0f, 0x00, 0x00]),
        bytes([0x01, 100, 50, 200, 100, 0x0a, 0xaf, 0x00, 0x00]),
      ],
      {from: alice}
    )
    const svg = await contractInstance.draw(0);

    return assert.equal(
      svg,
      await fs.readFile(`${__dirname}/svgs/a.svg`, {encoding: 'utf-8'})
    );
  });
});