const hre = require("hardhat");
const { ethers } = hre;
const { BigNumber } = require("ethers");

async function main() {
  [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("Token");
  const Settings = await ethers.getContractFactory("Settings");
  const Registry = await ethers.getContractFactory("Registry");
  const Deployer = await ethers.getContractFactory("Deployer");
  const Controller = await ethers.getContractFactory("Controller");
  const BridgePool = await ethers.getContractFactory("BridgePool");
  const Bridge = await ethers.getContractFactory("Bridge");
  const FeeController = await ethers.getContractFactory("FeeController");

  if (hre.network.name === "testnet") {
    const token = await Token.deploy("Quintin", "QNT");
    const controller = await Controller.deploy();
    const registry = await Registry.deploy();
    const settings = await Settings.deploy(
      controller.address,
      "0x560c6067b94048F92Bd89e44D205c3597A4fe82E"
    );
    const feecontroller = await FeeController.deploy(
      controller.address,
      settings.address
    );
    const deployer = await Deployer.deploy(controller.address);
    const bridgepool = await BridgePool.deploy(controller.address);
    const bridge = await Bridge.deploy(
      controller.address,
      settings.address,
      registry.address,
      deployer.address,
      feecontroller.address,
      bridgepool.address,
      "0x560c6067b94048F92Bd89e44D205c3597A4fe82E"
    );
  }
  console.log("here are the deployed contracts ", {
    token: token.address,
    controller: controller.address,
    registry: registry.address,
    settings: settings.address,
    feecontroller: feecontroller.address,
    deployer: deployer.address,
    bridgepool: bridgepool.address,
    bridge: bridge.address,
  });
  //   if (hre.network.name === "mainnet" || hre.network.name === "testnet") {
  //     await hre.run("verify:verify", {
  //       address: quidRaise.address,
  //       constructorArguments: [],
  //     });
  //   } else {
  //     console.log(
  //       "Contracts deployed to",
  //       hre.network.name,
  //       "network. Please verify them manually."
  //     );
  //   }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
