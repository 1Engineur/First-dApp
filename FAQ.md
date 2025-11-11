# FAQ - Frequently Asked Questions

## General Questions

### What is a dApp?
A dApp (decentralized application) is an application that runs on a blockchain network instead of centralized servers. It typically consists of smart contracts (backend) and a web interface (frontend).

### What is Ethereum?
Ethereum is a blockchain platform that allows developers to build and deploy smart contracts and dApps. It has its own cryptocurrency called Ether (ETH).

### What is a smart contract?
A smart contract is code that runs on the blockchain. Once deployed, it executes automatically when certain conditions are met, without needing a middleman.

### Do I need to know blockchain to start?
No! This starter repository is designed for beginners. Basic JavaScript knowledge helps, but you can learn as you go.

## Setup Questions

### Why do I need Node.js?
Node.js lets you run JavaScript on your computer. We use it to run development tools like Hardhat and to manage project dependencies.

### What is MetaMask?
MetaMask is a browser extension that acts as a cryptocurrency wallet. It lets you interact with dApps and sign transactions.

### Do I need real money to test?
No! You can use:
- Local blockchain (completely free, no real money)
- Testnets with free test ETH (not real money)
- Only need real ETH for mainnet deployment

### How do I get test ETH?
Visit a faucet website like:
- Sepolia: [sepoliafaucet.com](https://sepoliafaucet.com/)
- Goerli: [goerlifaucet.com](https://goerlifaucet.com/)

Enter your wallet address and receive free test ETH.

## Development Questions

### What is Hardhat?
Hardhat is a development environment for Ethereum. It helps you:
- Compile smart contracts
- Run tests
- Deploy contracts
- Debug code

### What is Solidity?
Solidity is the programming language used to write smart contracts for Ethereum. It's similar to JavaScript and C++.

### Why use OpenZeppelin?
OpenZeppelin provides secure, tested smart contract templates. Instead of writing everything from scratch, you can use their battle-tested code.

### What is gas?
Gas is the fee paid to execute transactions or run smart contracts on Ethereum. It's paid in ETH and goes to miners/validators.

### How much does deployment cost?
Costs vary based on:
- Network (local = free, testnet = free, mainnet = $$$)
- Gas prices (changes constantly)
- Contract complexity

Example mainnet costs (approximate):
- Simple contract: $5-50
- Complex contract: $50-500+

### Can I change a smart contract after deployment?
No! Smart contracts are immutable once deployed. Plan carefully and test thoroughly. You can:
- Deploy a new version
- Use upgradeable contract patterns (advanced)

## Usage Questions

### Why did my transaction fail?
Common reasons:
- Out of gas (increase gas limit)
- Contract error (check error message)
- Wrong network (switch to correct network)
- Insufficient funds

### What's the difference between view and public functions?
- `view`: Only reads data, doesn't change state, FREE to call
- `public`: Can change state, costs gas, needs transaction

### How do I test my contracts?
```bash
npm test
```

Tests are in the `test/` folder. Add new tests for new features.

### How do I deploy to testnet?
1. Get test ETH from faucet
2. Configure `.env` with RPC URL and private key
3. Run `npm run deploy:testnet`

## Troubleshooting

### "Error: Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Network timeout"
- Check your internet connection
- Try different RPC provider
- Increase timeout in `hardhat.config.js`

### "Transaction underpriced"
- Increase gas price
- Wait and try again (gas prices fluctuate)

### "Nonce too low"
- Clear pending transactions in MetaMask
- Reset account in MetaMask settings

### MetaMask not detecting my local network
- Make sure Hardhat node is running
- Check network settings (RPC URL, Chain ID)
- Try disconnecting and reconnecting

### Frontend not updating after contract changes
- Redeploy contracts
- Update contract addresses in frontend
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)

## Security Questions

### Is my private key safe?
- NEVER share your private key
- NEVER commit `.env` to git
- Use separate wallets for dev/production
- Keep main funds in hardware wallet

### How do I secure my smart contracts?
- Use OpenZeppelin contracts
- Write comprehensive tests
- Get security audit before mainnet
- Follow security best practices
- Start with simple, well-tested patterns

### What happens if I find a bug after deployment?
- You cannot change deployed contracts
- You may need to deploy a new version
- Have an emergency plan before deployment
- Consider using proxy patterns for upgrades

## Cost Questions

### How much does it cost to learn?
- This repository: FREE
- Local testing: FREE
- Testnet deployment: FREE
- Learning resources: Mostly FREE
- Mainnet deployment: Costs real ETH

### What are typical gas costs?
Gas costs depend on network congestion:
- Low: 20-30 gwei
- Medium: 30-50 gwei
- High: 50-100+ gwei

### Can I reduce gas costs?
Yes:
- Deploy during low-traffic times
- Optimize your code
- Use gas-efficient patterns
- Batch transactions
- Use Layer 2 solutions

## Next Steps Questions

### What should I learn next?
1. Master the basics (SimpleStorage)
2. Understand tokens (ERC20)
3. Try NFTs (ERC721)
4. Build a small project
5. Deploy to testnet
6. Learn advanced patterns

### Where can I find help?
- Ethereum Stack Exchange
- Discord communities
- This repository's issues
- Reddit r/ethdev
- Twitter #ethereum

### How long does it take to learn?
- Basics: 1-2 weeks
- Build first dApp: 1 month
- Comfortable with Solidity: 2-3 months
- Production-ready: 6+ months

### Can I make money building dApps?
Yes! Opportunities include:
- Freelance development
- Full-time blockchain jobs
- Building your own projects
- Hackathon prizes
- Bug bounties
- Grants and funding

## Still Have Questions?

- Check the [documentation](./docs/)
- Read the [RESOURCES.md](./RESOURCES.md)
- Open an issue on GitHub
- Ask on Ethereum Stack Exchange

---

Don't see your question? Open an issue and we'll add it!
