var MyContract = artifacts.require("NftMarket");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};
