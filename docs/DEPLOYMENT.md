# Deployment Guide

This guide walks you through deploying your smart contracts to different networks.

## Networks Overview

### Local Network (Development)
- **Purpose**: Testing during development
- **Cost**: Free
- **Speed**: Instant
- **Reset**: Restart = fresh blockchain

### Testnets (Staging)
- **Purpose**: Testing with real blockchain
- **Cost**: Free (use faucets)
- **Speed**: Similar to mainnet
- **Networks**: Sepolia, Goerli

### Mainnet (Production)
- **Purpose**: Real deployment
- **Cost**: Real ETH
- **Speed**: ~12-15 seconds per block
- **Risk**: Real money involved!

## Local Deployment

### 1. Start Local Node

```bash
npm run node
```

Keep this terminal running.

### 2. Deploy

In a new terminal:

```bash
npm run deploy:local
```

### 3. Verify

The script will output contract addresses:
```
SimpleStorage deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
MyToken deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

These addresses are also saved to `deployment-addresses.json`.

## Testnet Deployment (Sepolia)

### Prerequisites

1. **Get test ETH**
   - Go to [sepoliafaucet.com](https://sepoliafaucet.com/)
   - Enter your wallet address
   - Wait for ETH (usually 0.5 ETH)

2. **Get RPC URL**
   - Sign up at [alchemy.com](https://www.alchemy.com/)
   - Create new app (select Sepolia)
   - Copy API key

3. **Configure .env**

```bash
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_private_key_from_metamask
ETHERSCAN_API_KEY=your_etherscan_api_key
```

⚠️ **Security Warning**: Use a separate wallet for testing! Never use your main wallet's private key.

### Deploy to Sepolia

```bash
npm run deploy:testnet
```

Wait for transactions to confirm (may take 30-60 seconds).

### Verify on Etherscan

After deployment, verify your contracts:

1. Go to [sepolia.etherscan.io](https://sepolia.etherscan.io/)
2. Search for your contract address
3. Go to "Contract" tab
4. Click "Verify and Publish"
5. Or use Hardhat:

```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS "constructor_args"
```

Example:
```bash
npx hardhat verify --network sepolia 0x123... 1000000000000000000000000
```

## Mainnet Deployment

⚠️ **WARNING**: Mainnet uses real ETH! Double-check everything!

### Pre-Deployment Checklist

- [ ] Contracts thoroughly tested
- [ ] Security audit completed
- [ ] All tests passing
- [ ] Gas optimization done
- [ ] Error messages clear
- [ ] Access controls verified
- [ ] Emergency pause mechanism (if needed)
- [ ] Upgrade path considered

### Steps

1. **Add Mainnet Config** to `hardhat.config.js`:

```javascript
mainnet: {
  url: process.env.MAINNET_RPC_URL || "",
  accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  chainId: 1
}
```

2. **Update .env**:

```bash
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_private_key
```

3. **Check Gas Prices**:

Visit [etherscan.io/gastracker](https://etherscan.io/gastracker) to check current gas prices. Deploy during low gas times to save money.

4. **Deploy**:

```bash
npx hardhat run scripts/deploy.js --network mainnet
```

5. **Verify**:

```bash
npx hardhat verify --network mainnet CONTRACT_ADDRESS "args"
```

## Advanced Deployment

### Custom Deployment Script

Create `scripts/deploy-custom.js`:

```javascript
const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts...");
  
  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);
  
  // Check balance
  const balance = await deployer.getBalance();
  console.log("Balance:", hre.ethers.formatEther(balance), "ETH");
  
  // Deploy with custom gas
  const Contract = await hre.ethers.getContractFactory("MyContract");
  const contract = await Contract.deploy({
    gasLimit: 3000000,
    gasPrice: hre.ethers.parseUnits("20", "gwei")
  });
  
  await contract.waitForDeployment();
  console.log("Deployed to:", await contract.getAddress());
  
  // Wait for block confirmations
  await contract.deploymentTransaction().wait(5);
  console.log("Confirmed!");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

### Deploy with Constructor Arguments

```javascript
const MyToken = await ethers.getContractFactory("MyToken");
const initialSupply = ethers.parseEther("1000000");
const token = await MyToken.deploy(initialSupply);
```

### Deploy Multiple Contracts

```javascript
// Deploy in sequence
const storage = await SimpleStorage.deploy();
await storage.waitForDeployment();

const token = await MyToken.deploy(1000000);
await token.waitForDeployment();

// Link contracts if needed
await storage.setTokenAddress(await token.getAddress());
```

## Gas Optimization

### Estimate Deployment Cost

```javascript
const Contract = await ethers.getContractFactory("MyContract");
const deployTx = await Contract.getDeployTransaction();
const gasEstimate = await provider.estimateGas(deployTx);
console.log("Estimated gas:", gasEstimate.toString());
```

### Set Custom Gas Price

```javascript
const contract = await Contract.deploy({
  gasPrice: ethers.parseUnits("20", "gwei")
});
```

### Check Current Gas Price

```javascript
const gasPrice = await provider.getGasPrice();
console.log("Current gas price:", ethers.formatUnits(gasPrice, "gwei"), "gwei");
```

## Multi-Network Deployment

Deploy to multiple networks:

```bash
# Deploy to all testnets
for network in sepolia goerli
do
  echo "Deploying to $network..."
  npx hardhat run scripts/deploy.js --network $network
done
```

## Upgradeable Contracts

For contracts that need upgrading:

### Install Plugin

```bash
npm install @openzeppelin/hardhat-upgrades
```

### Deploy Proxy

```javascript
const { upgrades } = require("hardhat");

async function main() {
  const Contract = await ethers.getContractFactory("MyContract");
  const proxy = await upgrades.deployProxy(Contract, [arg1, arg2]);
  await proxy.waitForDeployment();
  console.log("Proxy deployed to:", await proxy.getAddress());
}
```

### Upgrade Contract

```javascript
const ContractV2 = await ethers.getContractFactory("MyContractV2");
const upgraded = await upgrades.upgradeProxy(proxyAddress, ContractV2);
```

## Post-Deployment

### Save Contract Info

```javascript
const fs = require("fs");

const deployment = {
  network: hre.network.name,
  contracts: {
    SimpleStorage: await simpleStorage.getAddress(),
    MyToken: await myToken.getAddress()
  },
  deployer: deployer.address,
  timestamp: new Date().toISOString(),
  blockNumber: await provider.getBlockNumber()
};

fs.writeFileSync(
  `deployments/${hre.network.name}.json`,
  JSON.stringify(deployment, null, 2)
);
```

### Update Frontend

After deployment, update `frontend/js/app.js`:

```javascript
const SIMPLE_STORAGE_ADDRESS = "0xYourDeployedAddress";
const MY_TOKEN_ADDRESS = "0xYourTokenAddress";
```

### Test Deployed Contracts

```bash
npx hardhat console --network sepolia
```

Then in console:
```javascript
const contract = await ethers.getContractAt(
  "SimpleStorage",
  "0xYourAddress"
);
await contract.get();
```

## Troubleshooting

### "Insufficient Funds"
- Check wallet balance
- Make sure you have enough for gas

### "Nonce Too Low"
- Clear pending transactions in MetaMask
- Or set nonce manually in deployment

### "Gas Estimation Failed"
- Constructor might be reverting
- Check constructor logic
- Verify arguments are correct

### "Network Timeout"
- Try different RPC provider
- Increase timeout in hardhat.config.js:

```javascript
networks: {
  sepolia: {
    url: "...",
    timeout: 60000 // 60 seconds
  }
}
```

## Best Practices

1. **Test Extensively**: Always test on testnet first
2. **Use Multi-Sig**: For mainnet, use multi-signature wallet
3. **Verify Contracts**: Always verify on Etherscan
4. **Document Addresses**: Keep record of all deployments
5. **Monitor Contracts**: Set up monitoring after deployment
6. **Plan Upgrades**: Consider upgrade mechanism from start
7. **Backup Data**: Save all deployment info

## Cost Estimates (Approximate)

Based on 30 gwei gas price:

| Contract | Gas Used | Cost (ETH) | Cost (USD @ $2000/ETH) |
|----------|----------|------------|------------------------|
| SimpleStorage | ~150K | 0.0045 | $9 |
| MyToken (ERC20) | ~1.5M | 0.045 | $90 |

Actual costs vary with gas prices and ETH price.

## Resources

- [Etherscan Gas Tracker](https://etherscan.io/gastracker)
- [Hardhat Deploy Plugin](https://github.com/wighawag/hardhat-deploy)
- [OpenZeppelin Upgrades](https://docs.openzeppelin.com/upgrades-plugins/1.x/)
