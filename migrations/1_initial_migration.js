const Willow = artifacts.require("Willow");
const Repository = artifacts.require("Repository");
const Drawer = artifacts.require("Drawer");
const Lib = artifacts.require("Lib");
const Rect = artifacts.require("Rect");
const Ellipse = artifacts.require("Ellipse");

module.exports = async function (deployer) {
  await deployer.deploy(Lib);
  await deployer.link(Lib, Willow);
  await deployer.link(Lib, Drawer);
  await deployer.link(Lib, Rect);
  await deployer.link(Lib, Ellipse);
  await deployer.deploy(Repository);
  await deployer.deploy(Drawer, Repository.address);
  await deployer.deploy(Willow, Repository.address, Drawer.address);

  await deployer.deploy(Rect);
  await Drawer.deployed().then((w) => w.addDecoder(Rect.address));
  await deployer.deploy(Ellipse);
  await Drawer.deployed().then((w) => w.addDecoder(Ellipse.address));
};
