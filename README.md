# First-dApp 🚀

Welcome to your first decentralized application (dApp) starter repository! This project is designed to help you and your team learn blockchain development by providing a complete, working example of a dApp built on Ethereum.

## 📚 What You'll Learn

- How to write and deploy smart contracts using Solidity
- How to test smart contracts with Hardhat
- How to build a frontend that interacts with blockchain
- How to use MetaMask for wallet connections
- The basics of ERC20 tokens
- Best practices for dApp development

## 🎯 What's Included

This repository contains:

- **Smart Contracts**: Two example contracts (SimpleStorage and MyToken)
- **Tests**: Complete test suites for both contracts
- **Deployment Scripts**: Automated deployment to local and test networks
- **Frontend**: A user-friendly web interface to interact with your contracts
- **Development Tools**: Hardhat configuration for professional development

## 🏗️ Project Structure

```
First-dApp/
├── contracts/              # Smart contracts written in Solidity
│   ├── SimpleStorage.sol  # Basic storage contract
│   └── MyToken.sol        # ERC20 token contract
├── test/                  # Test files for smart contracts
│   ├── SimpleStorage.test.js
│   └── MyToken.test.js
├── scripts/               # Deployment and utility scripts
│   └── deploy.js         # Main deployment script
├── frontend/              # Web interface for the dApp
│   ├── index.html
│   ├── css/
│   └── js/
├── hardhat.config.js      # Hardhat configuration
├── package.json           # Node.js dependencies
└── .env.example          # Environment variables template
```

## 🚀 Quick Start

### Prerequisites

Before you begin, make sure you have:
- [Node.js](https://nodejs.org/) (v16 or later)
- [MetaMask](https://metamask.io/) browser extension
- Basic understanding of JavaScript

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your values (for testnet deployment)
   ```

3. **Compile contracts**
   ```bash
   npm run compile
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Start local blockchain**
   ```bash
   npm run node
   ```
   Keep this running in a separate terminal.

6. **Deploy contracts** (in a new terminal)
   ```bash
   npm run deploy:local
   ```

7. **Open the frontend**
   - Open `frontend/index.html` in your browser
   - Connect your MetaMask wallet
   - Make sure MetaMask is connected to localhost:8545
   - Start interacting with your dApp!

## 📖 Detailed Documentation

- [Setup Guide](./docs/SETUP.md) - Detailed setup instructions
- [Smart Contracts Guide](./docs/CONTRACTS.md) - Understanding the contracts
- [Frontend Guide](./docs/FRONTEND.md) - How the frontend works
- [Deployment Guide](./docs/DEPLOYMENT.md) - Deploy to testnets and mainnet
- [Contributing](./docs/CONTRIBUTING.md) - How to contribute

## 🧪 Running Tests

Run all tests:
```bash
npm test
```

Run tests with coverage:
```bash
npx hardhat coverage
```

## 📦 Available Scripts

- `npm run compile` - Compile smart contracts
- `npm test` - Run all tests
- `npm run node` - Start local Hardhat network
- `npm run deploy:local` - Deploy to local network
- `npm run deploy:testnet` - Deploy to Sepolia testnet
- `npm run clean` - Clean compiled artifacts

## 🔐 Security

- Never commit your `.env` file
- Never share your private keys
- Always test on testnets before mainnet
- Get your contracts audited before production use

## 🌟 Next Steps

Once you're comfortable with this starter:

1. Modify the contracts to add your own features
2. Create new smart contracts
3. Enhance the frontend with more functionality
4. Deploy to Ethereum testnets (Sepolia, Goerli)
5. Learn about gas optimization
6. Explore DeFi, NFTs, and other use cases

## 📚 Learning Resources

- [Ethereum Documentation](https://ethereum.org/developers)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)
- [Ethers.js Documentation](https://docs.ethers.org/)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 💬 Get Help

- Check out the [docs](./docs/) folder
- Open an issue if you find bugs
- Join Ethereum developer communities
- Ask questions on Stack Overflow

## 🎓 About This Project

This is a learning project designed to help developers get started with blockchain development. It includes best practices and examples that you can build upon for your own projects.

Happy coding! 🚀
