const Willow = artifacts.require("Willow");
const Lib = artifacts.require("Lib");

module.exports = async function (deployer) {
  await deployer.deploy(Lib);
  await deployer.link(Lib, Willow);
  await deployer.deploy(Willow);
};
