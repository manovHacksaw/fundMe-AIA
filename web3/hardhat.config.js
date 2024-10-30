require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();  

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    aiaTestnet: {
      url: `https://aia-dataseed1-testnet.aiachain.org`,
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId: 1320,
    },
  }
};
