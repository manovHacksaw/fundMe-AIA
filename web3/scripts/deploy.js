const ethers = require("ethers");
const hre = require("hardhat");

async function main() {
  // Compile the contracts
  await hre.run("compile");

  const provider = new ethers.getDefaultProvider();

  // Get the default signer (first account) from the provider
  const signers = await hre.ethers.getSigners();
  const signer = signers[0]; // Use the first signer

  console.log(
    "Deploying contracts with the account:",
    await signer.getAddress()
  );

  const balance = await provider.getBalance(await signer.getAddress());
  console.log("Account balance:", balance.toString(), "AIA");

  // Get the contract factory and deploy the contract
  const Crowdfunding = await hre.ethers.getContractFactory(
    "Crowdfunding",
    signer
  );
  const crowdfunding = await Crowdfunding.deploy();

  await crowdfunding.waitForDeployment(); // Wait for the deployment to complete

  console.log("Crowdfunding contract deployed to:", await crowdfunding.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
