const hre = require("hardhat");

async function main() {
  console.log("Starting deployment...");

  // Deploy SimpleStorage
  console.log("\nDeploying SimpleStorage...");
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();
  await simpleStorage.waitForDeployment();
  const simpleStorageAddress = await simpleStorage.getAddress();
  console.log("SimpleStorage deployed to:", simpleStorageAddress);

  // Deploy MyToken
  console.log("\nDeploying MyToken...");
  const initialSupply = hre.ethers.parseEther("1000000"); // 1 million tokens
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const myToken = await MyToken.deploy(initialSupply);
  await myToken.waitForDeployment();
  const myTokenAddress = await myToken.getAddress();
  console.log("MyToken deployed to:", myTokenAddress);

  // Display deployment summary
  console.log("\n========================================");
  console.log("Deployment Summary:");
  console.log("========================================");
  console.log("SimpleStorage:", simpleStorageAddress);
  console.log("MyToken:", myTokenAddress);
  console.log("Initial Token Supply:", hre.ethers.formatEther(initialSupply), "MTK");
  console.log("========================================\n");

  // Save deployment addresses to a file for frontend use
  const fs = require("fs");
  const deploymentInfo = {
    network: hre.network.name,
    SimpleStorage: simpleStorageAddress,
    MyToken: myTokenAddress,
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync(
    "deployment-addresses.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("Deployment addresses saved to deployment-addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
