# Quick Start Guide

Get started with your first dApp in under 10 minutes!

## Step 1: Install Prerequisites (5 minutes)

### Install Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version
3. Run the installer
4. Verify: Open terminal and type `node --version`

### Install MetaMask
1. Visit [metamask.io](https://metamask.io/)
2. Click "Download"
3. Add to your browser (Chrome, Firefox, or Brave)
4. Create a new wallet
5. **IMPORTANT**: Save your seed phrase somewhere safe!

## Step 2: Set Up the Project (2 minutes)

```bash
# Install dependencies
npm install

# This installs:
# - Hardhat (Ethereum development environment)
# - Ethers.js (library to interact with Ethereum)
# - OpenZeppelin (secure smart contract library)
# - Chai (testing framework)
```

## Step 3: Compile Contracts (30 seconds)

```bash
npm run compile
```

This compiles your Solidity smart contracts into bytecode that can run on Ethereum.

## Step 4: Run Tests (30 seconds)

```bash
npm test
```

All tests should pass ✅. This verifies your contracts work correctly.

## Step 5: Start Local Blockchain (30 seconds)

Open a new terminal and run:

```bash
npm run node
```

**Leave this running!** This creates a local Ethereum blockchain on your computer with:
- 20 test accounts
- 10,000 ETH each
- No real money involved

## Step 6: Deploy Contracts (30 seconds)

In a **new terminal**:

```bash
npm run deploy:local
```

This deploys your smart contracts to your local blockchain. You'll see output like:

```
SimpleStorage deployed to: 0x5FbDB...
MyToken deployed to: 0xe7f1...
```

## Step 7: Connect MetaMask (1 minute)

### Add Local Network to MetaMask

1. Click MetaMask extension
2. Click network dropdown (usually says "Ethereum Mainnet")
3. Click "Add Network" → "Add a network manually"
4. Enter:
   - **Network Name**: Localhost 8545
   - **RPC URL**: http://127.0.0.1:8545
   - **Chain ID**: 1337
   - **Currency Symbol**: ETH
5. Click "Save"

### Import a Test Account

1. Look at the terminal running `npm run node`
2. Find "Account #0" and copy the private key (starts with 0x...)
3. In MetaMask: Click account icon → "Import Account"
4. Paste the private key
5. Click "Import"

You now have 10,000 test ETH! 💰

## Step 8: Use the dApp (1 minute)

1. Open `frontend/index.html` in your browser
2. Click "Connect Wallet"
3. Approve the connection in MetaMask
4. Try the features:
   - Store a number in SimpleStorage
   - Check your token balance
   - Transfer tokens to another address

## 🎉 Congratulations!

You've just:
- ✅ Set up a development environment
- ✅ Compiled smart contracts
- ✅ Deployed to a blockchain
- ✅ Created a working dApp

## What's Next?

### Learn More
- Read [docs/CONTRACTS.md](./docs/CONTRACTS.md) to understand the smart contracts
- Check [docs/FRONTEND.md](./docs/FRONTEND.md) to learn about the UI
- Explore [docs/SETUP.md](./docs/SETUP.md) for detailed setup options

### Try These Challenges

1. **Easy**: Change the stored number and see it update
2. **Medium**: Add a new function to increment the stored value
3. **Hard**: Create a new smart contract from scratch
4. **Expert**: Deploy to a real testnet (Sepolia)

### Modify the Contracts

1. Edit `contracts/SimpleStorage.sol`
2. Run `npm run compile`
3. Run `npm test`
4. Deploy again: `npm run deploy:local`
5. Refresh the frontend and test!

## Common Issues

### "Cannot connect to wallet"
- Make sure MetaMask is installed
- Click the MetaMask icon and unlock it
- Make sure you're on the "Localhost 8545" network

### "Transaction failed"
- Check you're on the right network
- Make sure local node is still running
- Try refreshing the page

### "Contract not found"
- Run `npm run deploy:local` again
- Make sure contract addresses in frontend match deployed addresses

## Getting Help

- Check the [main README](../README.md)
- Look at [docs/](./docs/) for detailed guides
- Open an issue on GitHub
- Ask on Ethereum Stack Exchange

## Pro Tips 💡

1. **Keep the local node running** while developing
2. **Check the browser console** (F12) for errors
3. **Read error messages** carefully - they usually tell you what's wrong
4. **Start simple** - master the basics before adding complexity
5. **Test often** - run tests after every change

## Next Learning Steps

1. **Week 1**: Understand how SimpleStorage works
2. **Week 2**: Modify MyToken to add new features
3. **Week 3**: Create a new contract (try a voting system)
4. **Week 4**: Deploy to Sepolia testnet
5. **Month 2**: Build your own dApp idea!

## Recommended Learning Path

### Beginner
- Modify existing contracts
- Add simple functions
- Change UI styling
- Deploy to testnet

### Intermediate  
- Create new contracts
- Use events and indexing
- Add access controls
- Integrate with libraries

### Advanced
- Write complex logic
- Optimize gas usage
- Implement upgradeable contracts
- Build production dApps

---

**Ready to dive deeper?** Check out the [full documentation](./docs/) or start coding! 🚀
