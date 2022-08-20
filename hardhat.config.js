require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("@nomiclabs/hardhat-truffle5");

const { utils } = require("ethers");

const TESTNET_DEPLOYER = "";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "localhost",
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
    ],
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  networks: {
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      blockGasLimit: 9999999999999,
      allowUnlimitedContractSize: true,
      accounts: [`${TESTNET_DEPLOYER}`],
    },
    hardhat: {
      // forking: {
      //   url: `https://bsc-dataseed.binance.org/`,
      //   // blockNumber: 6674768,
      // },
      blockGasLimit: 12000000,
      allowUnlimitedContractSize: true,
    },
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY,
  },
  mocha: {
    timeout: 50000,
  },
};