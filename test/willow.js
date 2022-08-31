const Willow = artifacts.require("Willow");
const fs = require("fs").promises;

contract("Willow", function ([alice]) {
  const z = ['0', '1', '2', '3', '4', '5', '6', '7' , '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
  const hex = (x) => `${z[Math.floor(x/16)]}${z[x%16]}`
  it("assert svg", async () => {
    const contractInstance = await Willow.deployed();
    const i = await contractInstance.create(
      [
        '0x'.concat([0x01, 10, 30, 100, 150, 0xf0, 0x0f, 0x00, 0x00].map(hex).join('')),
        '0x'.concat([0x01, 100, 50, 200, 100, 0x0a, 0xaf, 0x00, 0x00].map(hex).join('')),
      ],
      {from: alice}
    )
    const svg = await contractInstance.draw.call(0);

    return assert.equal(
      svg,
      await fs.readFile(`${__dirname}/svgs/a.svg`, {encoding: 'utf-8'})
    );
  });
});
