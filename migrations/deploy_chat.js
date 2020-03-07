var simpleChat = artifacts.require("./chat.sol");

module.exports = function(deployer) {
    deployer.deploy(simpleChat);
}