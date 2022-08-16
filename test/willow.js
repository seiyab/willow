const Willow = artifacts.require("Willow");
const fs = require("fs").promises;

contract("Willow", function ([alice]) {
  it("assert svg", async () => {
    const contractInstance = await Willow.deployed();
    const i = await contractInstance.create(
      [
        { x: 10, y: 30, width: 100, height: 150, color: 0xf00f },
        { x: 100, y: 50, width: 200, height: 100, color: 0x0aaf },
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
