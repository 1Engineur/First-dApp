# Setup Guide

This guide will walk you through setting up your development environment for building dApps.

## Prerequisites

### 1. Install Node.js

Download and install Node.js from [nodejs.org](https://nodejs.org/). We recommend the LTS version (v16 or later).

Verify installation:
```bash
node --version
npm --version
```

### 2. Install MetaMask

MetaMask is a browser wallet that lets you interact with Ethereum:

1. Visit [metamask.io](https://metamask.io/)
2. Install the browser extension
3. Create a new wallet (save your seed phrase securely!)
4. Get some test ETH from a faucet

### 3. Get Test ETH

For testnets, you'll need test ETH:
- Sepolia Faucet: [sepoliafaucet.com](https://sepoliafaucet.com/)
- Goerli Faucet: [goerlifaucet.com](https://goerlifaucet.com/)

## Project Setup

### 1. Clone and Install

```bash
# Navigate to project directory
cd First-dApp

# Install dependencies
npm install
```

This will install:
- Hardhat (development environment)
- Ethers.js (library for blockchain interaction)
- OpenZeppelin (secure contract libraries)
- Testing utilities

### 2. Configure Environment

Create your environment file:
```bash
cp .env.example .env
```

Edit `.env` and add your values:
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_metamask_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
```

**Important Security Notes:**
- Never commit your `.env` file to git
- Never share your private key
- Use a separate wallet for development
- Keep only small amounts in test wallets

### 3. Get RPC URL (Optional - for testnets)

For testnet deployment, you'll need an RPC URL:

1. Go to [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/)
2. Create a free account
3. Create a new app
4. Copy your API key
5. Add it to `.env`

### 4. Compile Contracts

```bash
npm run compile
```

This compiles your Solidity contracts and generates:
- Contract artifacts in `artifacts/`
- TypeScript types in `typechain/` (if using TypeScript)

### 5. Run Tests

```bash
npm test
```

You should see all tests passing! ✅

## Local Development

### Start Local Blockchain

Hardhat provides a local Ethereum network:

```bash
npm run node
```

This starts a local blockchain at `http://127.0.0.1:8545` with:
- 20 test accounts with 10,000 ETH each
- Automatic mining
- Console output of all transactions

**Keep this terminal running!**

### Deploy to Local Network

In a new terminal:

```bash
npm run deploy:local
```

This will:
1. Deploy all contracts
2. Display contract addresses
3. Save addresses to `deployment-addresses.json`

### Connect MetaMask to Local Network

1. Open MetaMask
2. Click network dropdown
3. Select "Add Network" → "Add a network manually"
4. Enter these details:
   - Network Name: Localhost 8545
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 1337
   - Currency Symbol: ETH
5. Click "Save"

### Import Test Account

To use a test account from Hardhat:

1. Copy a private key from the Hardhat console
2. In MetaMask: Click account icon → Import Account
3. Paste the private key
4. You'll now have 10,000 test ETH!

## Using the Frontend

1. After deploying contracts, the deployment script creates `deployment-addresses.json`
2. Update `frontend/js/app.js` with contract addresses (or the app will load them automatically)
3. Open `frontend/index.html` in your browser
4. Connect MetaMask
5. Interact with your contracts!

## Troubleshooting

### "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Transaction failed"
- Make sure MetaMask is on the correct network
- Check you have enough ETH for gas
- Look at the error message in MetaMask

### "Contract not deployed"
- Run the deployment script
- Check you're on the right network
- Verify contract addresses in the frontend

### "Network timeout"
- Check your RPC URL
- Try a different RPC provider
- For local network, make sure Hardhat node is running

## Next Steps

Now that you're set up:
1. Read [CONTRACTS.md](./CONTRACTS.md) to understand the smart contracts
2. Check [FRONTEND.md](./FRONTEND.md) to learn about the UI
3. Try modifying the contracts and redeploying
4. Build your own features!

## Additional Tools

Consider installing these helpful tools:

### Hardhat VSCode Extension
- Syntax highlighting for Solidity
- Code completion
- Inline error checking

### Solidity VSCode Extension
- Advanced Solidity support
- Code formatting
- Security linting

### Remix IDE
- Browser-based Solidity IDE
- Great for quick testing
- Visit [remix.ethereum.org](https://remix.ethereum.org/)

## Getting Help

- Check the [main README](../README.md)
- Read Hardhat docs: [hardhat.org/docs](https://hardhat.org/docs)
- Ask on Stack Overflow with the `ethereum` tag
- Join Ethereum developer Discord communities
