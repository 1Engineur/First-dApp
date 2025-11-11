# Smart Contracts Guide

This guide explains the smart contracts included in this starter repository.

## Overview

This repository includes two example contracts:

1. **SimpleStorage** - A basic contract to learn Solidity fundamentals
2. **MyToken** - An ERC20 token implementation

## SimpleStorage Contract

### Purpose
SimpleStorage is the simplest possible smart contract - it stores a number and lets you retrieve it. Perfect for learning!

### Code Walkthrough

```solidity
contract SimpleStorage {
    uint256 private storedData;
    event ValueChanged(uint256 newValue, address changedBy);
    
    function set(uint256 x) public {
        storedData = x;
        emit ValueChanged(x, msg.sender);
    }
    
    function get() public view returns (uint256) {
        return storedData;
    }
}
```

### Key Concepts

**State Variables**
```solidity
uint256 private storedData;
```
- Stored permanently on the blockchain
- `uint256` = unsigned integer (0 to 2^256-1)
- `private` = only accessible within this contract

**Functions**
```solidity
function set(uint256 x) public
```
- `public` = anyone can call this
- Changes state = costs gas
- Requires a transaction

```solidity
function get() public view returns (uint256)
```
- `view` = only reads data, doesn't change state
- Free to call (no gas cost)
- Returns a uint256 value

**Events**
```solidity
event ValueChanged(uint256 newValue, address changedBy);
emit ValueChanged(x, msg.sender);
```
- Events log data to the blockchain
- Can be filtered and searched
- `msg.sender` = address calling the function

### Usage Examples

```javascript
// Deploy
const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
const contract = await SimpleStorage.deploy();

// Set a value (costs gas)
await contract.set(42);

// Get the value (free)
const value = await contract.get(); // Returns 42

// Listen for events
contract.on("ValueChanged", (newValue, changedBy) => {
    console.log(`Value changed to ${newValue} by ${changedBy}`);
});
```

## MyToken Contract (ERC20)

### Purpose
MyToken demonstrates how to create a cryptocurrency token using the ERC20 standard.

### Code Walkthrough

```solidity
contract MyToken is ERC20, Ownable {
    constructor(uint256 initialSupply) 
        ERC20("MyToken", "MTK") 
        Ownable(msg.sender) 
    {
        _mint(msg.sender, initialSupply);
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

### Key Concepts

**Inheritance**
```solidity
contract MyToken is ERC20, Ownable
```
- Inherits from OpenZeppelin's ERC20 and Ownable
- Gets all standard token functions
- Gets owner management

**Constructor**
```solidity
constructor(uint256 initialSupply)
```
- Runs once when contract is deployed
- Sets token name ("MyToken") and symbol ("MTK")
- Mints initial supply to deployer

**Access Control**
```solidity
function mint(address to, uint256 amount) public onlyOwner
```
- `onlyOwner` modifier restricts access
- Only contract owner can mint new tokens
- Prevents unauthorized inflation

### ERC20 Standard Functions

Your token automatically has these functions:

```javascript
// Get token balance
await token.balanceOf(address);

// Transfer tokens
await token.transfer(recipient, amount);

// Approve someone to spend your tokens
await token.approve(spender, amount);

// Transfer tokens on behalf of someone
await token.transferFrom(from, to, amount);

// Get token name and symbol
await token.name();    // "MyToken"
await token.symbol();  // "MTK"

// Get decimals (default 18)
await token.decimals(); // 18

// Get total supply
await token.totalSupply();
```

### Usage Examples

```javascript
// Deploy with 1 million tokens
const MyToken = await ethers.getContractFactory("MyToken");
const initialSupply = ethers.parseEther("1000000"); // 1M tokens
const token = await MyToken.deploy(initialSupply);

// Check your balance
const balance = await token.balanceOf(owner.address);
console.log(ethers.formatEther(balance)); // "1000000.0"

// Transfer tokens
await token.transfer(recipient, ethers.parseEther("100"));

// Mint new tokens (only owner)
await token.mint(recipient, ethers.parseEther("1000"));
```

## Understanding Wei, Gwei, and Ether

Ethereum uses different units:

```javascript
// 1 Ether = 1,000,000,000,000,000,000 Wei (10^18)
ethers.parseEther("1.0")      // 1 Ether in Wei
ethers.formatEther(amount)    // Wei to Ether

// Common amounts
ethers.parseEther("0.1")      // 0.1 ETH
ethers.parseUnits("50", "gwei") // 50 Gwei
```

## Gas and Costs

Every transaction costs gas:

```javascript
// Estimate gas for a transaction
const gasEstimate = await contract.set.estimateGas(42);

// Send with custom gas limit
await contract.set(42, { gasLimit: 100000 });

// View functions are free!
const value = await contract.get(); // No gas cost
```

## Security Best Practices

### Input Validation
```solidity
function set(uint256 x) public {
    require(x > 0, "Value must be positive");
    storedData = x;
}
```

### Access Control
```solidity
mapping(address => bool) public authorized;

modifier onlyAuthorized() {
    require(authorized[msg.sender], "Not authorized");
    _;
}

function restrictedFunction() public onlyAuthorized {
    // Only authorized users can call this
}
```

### Reentrancy Protection
```solidity
bool private locked;

modifier noReentrant() {
    require(!locked, "No reentrancy");
    locked = true;
    _;
    locked = false;
}
```

## Modifying the Contracts

### Add a New Function to SimpleStorage

```solidity
function increment() public {
    storedData += 1;
    emit ValueChanged(storedData, msg.sender);
}

function decrement() public {
    require(storedData > 0, "Cannot go below zero");
    storedData -= 1;
    emit ValueChanged(storedData, msg.sender);
}
```

### Add Token Burning

```solidity
function burn(uint256 amount) public {
    _burn(msg.sender, amount);
}
```

## Testing Your Changes

After modifying contracts:

1. Update tests in `test/`
2. Run `npm test`
3. Fix any failures
4. Recompile: `npm run compile`
5. Redeploy: `npm run deploy:local`

## Next Steps

- Learn about [mappings and arrays](https://docs.soliditylang.org/en/latest/types.html)
- Explore [OpenZeppelin contracts](https://docs.openzeppelin.com/contracts)
- Read about [common vulnerabilities](https://swcregistry.io/)
- Try building a voting contract
- Create an NFT (ERC721) contract

## Resources

- [Solidity Documentation](https://docs.soliditylang.org/)
- [OpenZeppelin Learn](https://docs.openzeppelin.com/learn/)
- [Ethernaut (security challenges)](https://ethernaut.openzeppelin.com/)
- [CryptoZombies (interactive tutorial)](https://cryptozombies.io/)
