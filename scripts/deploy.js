const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("Hello, World!");

  const FIATTToken = await hre.ethers.getContractFactory("FiatTokenV1");
  const fiatToken = await FIATTToken.deploy();

  // await greeter.deployed();
  await fiatToken.deployed();

  // console.log("Greeter deployed to:", greeter.address);
  console.log("Token deployed to:", fiatToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
