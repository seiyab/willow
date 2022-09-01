// FIXME
// import { bytes } from "webui/util/bytes";

const Willow = artifacts.require("Willow");
const fs = require("fs").promises;

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

const bytes = (xs: number[]): string => '0x' + xs.map(hexByte).join('');
const hexByte= (x: number) =>  `${digits[Math.floor(x/16) % 16]}${digits[x%16]}`
const digits = '0123456789abcdef';