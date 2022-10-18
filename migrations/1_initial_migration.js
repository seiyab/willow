const Willow = artifacts.require("Willow");
const Repository = artifacts.require("Repository");
const Drawer = artifacts.require("Drawer");
const Lib = artifacts.require("Lib");
const Rect = artifacts.require("Rect");

module.exports = async function (deployer) {
  await deployer.deploy(Lib);
  await deployer.link(Lib, Willow);
  await deployer.link(Lib, Drawer);
  await deployer.link(Lib, Rect);
  await deployer.deploy(Repository);
  await deployer.deploy(Drawer, Repository.address);
  await deployer.deploy(Willow, Repository.address, Drawer.address);
  const willow = await Willow.deployed();
  await willow.create([
    "0x01000096963c6f",
    "0x01c80032fa3aff",
    "0x0100c89632fa1f",
  ]);
};
