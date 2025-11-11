# Frontend Guide

This guide explains how the frontend works and how to customize it.

## Overview

The frontend is a simple web interface that connects to your smart contracts using:
- **HTML** - Structure
- **CSS** - Styling
- **JavaScript** - Logic
- **Ethers.js** - Blockchain interaction
- **MetaMask** - Wallet connection

## File Structure

```
frontend/
├── index.html          # Main HTML page
├── css/
│   └── style.css       # Styles
└── js/
    └── app.js          # Application logic
```

## How It Works

### 1. Wallet Connection

When users click "Connect Wallet":

```javascript
await window.ethereum.request({ method: 'eth_requestAccounts' });
provider = new ethers.providers.Web3Provider(window.ethereum);
signer = provider.getSigner();
```

This:
- Requests MetaMask permission
- Creates a provider to read blockchain data
- Creates a signer to send transactions

### 2. Contract Interaction

Contracts are initialized with address and ABI:

```javascript
const contract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
);
```

**Reading data** (free, no gas):
```javascript
const value = await contract.get();
```

**Writing data** (costs gas):
```javascript
const tx = await contract.set(42);
await tx.wait(); // Wait for confirmation
```

### 3. Handling Events

Listen for contract events:

```javascript
contract.on("ValueChanged", (newValue, changedBy) => {
    console.log(`Value: ${newValue} changed by ${changedBy}`);
});
```

## Key Components

### MetaMask Detection

```javascript
if (typeof window.ethereum === 'undefined') {
    alert('Please install MetaMask!');
}
```

### Network Detection

```javascript
const network = await provider.getNetwork();
console.log(network.name); // "localhost", "sepolia", etc.
```

### Account Changes

```javascript
window.ethereum.on('accountsChanged', (accounts) => {
    if (accounts.length === 0) {
        // User disconnected
    } else {
        // Account changed
        location.reload();
    }
});
```

### Transaction Status

```javascript
// Send transaction
const tx = await contract.set(42);
console.log("Transaction hash:", tx.hash);

// Wait for confirmation
const receipt = await tx.wait();
console.log("Confirmed in block:", receipt.blockNumber);
```

## Customizing the Frontend

### Change Styling

Edit `css/style.css`:

```css
/* Change primary color */
.btn-primary {
    background: linear-gradient(135deg, #your-color1, #your-color2);
}

/* Modify card appearance */
.card {
    background: #your-background;
    border-radius: 20px;
}
```

### Add New Contract Functions

1. **Add ABI entry** in `app.js`:
```javascript
const CONTRACT_ABI = [
    "function yourNewFunction(uint256 x) public",
    // ... other functions
];
```

2. **Add HTML element** in `index.html`:
```html
<div class="form-group">
    <input type="number" id="newInput" placeholder="Enter value">
    <button id="newBtn" class="btn btn-secondary">Call Function</button>
</div>
```

3. **Add event listener** in `app.js`:
```javascript
document.getElementById('newBtn').addEventListener('click', yourNewFunction);
```

4. **Implement function**:
```javascript
async function yourNewFunction() {
    try {
        const value = document.getElementById('newInput').value;
        const tx = await contract.yourNewFunction(value);
        await tx.wait();
        showStatus('Success!', 'success');
    } catch (error) {
        showStatus('Error: ' + error.message, 'error');
    }
}
```

### Display Token Balances

```javascript
async function displayBalance() {
    const balance = await tokenContract.balanceOf(userAccount);
    const symbol = await tokenContract.symbol();
    
    // Convert from Wei to Ether
    const formatted = ethers.utils.formatEther(balance);
    
    document.getElementById('balance').textContent = 
        `${formatted} ${symbol}`;
}
```

### Format Addresses

```javascript
function formatAddress(address) {
    return address.slice(0, 6) + '...' + address.slice(-4);
}

// Display: 0x1234...5678
```

## Error Handling

### Common Errors

**User Rejected Transaction**
```javascript
try {
    await contract.transfer(recipient, amount);
} catch (error) {
    if (error.code === 4001) {
        showStatus('Transaction cancelled', 'info');
    }
}
```

**Insufficient Funds**
```javascript
catch (error) {
    if (error.code === 'INSUFFICIENT_FUNDS') {
        showStatus('Not enough ETH for gas', 'error');
    }
}
```

**Wrong Network**
```javascript
const network = await provider.getNetwork();
if (network.chainId !== 1337) {
    showStatus('Please switch to localhost network', 'error');
}
```

## Best Practices

### 1. Always Validate Input

```javascript
if (!ethers.utils.isAddress(address)) {
    showStatus('Invalid address', 'error');
    return;
}

if (amount <= 0) {
    showStatus('Amount must be positive', 'error');
    return;
}
```

### 2. Handle Loading States

```javascript
async function setStorageValue() {
    const btn = document.getElementById('setValueBtn');
    btn.disabled = true;
    btn.textContent = 'Processing...';
    
    try {
        await contract.set(value);
    } finally {
        btn.disabled = false;
        btn.textContent = 'Store Value';
    }
}
```

### 3. Use Try-Catch

```javascript
async function callContract() {
    try {
        const result = await contract.someFunction();
        showStatus('Success!', 'success');
    } catch (error) {
        console.error(error);
        showStatus('Error: ' + error.message, 'error');
    }
}
```

### 4. Clear Sensitive Data

```javascript
// After successful transfer
document.getElementById('recipientInput').value = '';
document.getElementById('amountInput').value = '';
```

## Advanced Features

### Listen to All Events

```javascript
contract.on('*', (event) => {
    console.log('Event:', event);
});
```

### Get Transaction Receipt

```javascript
const receipt = await tx.wait();
console.log('Gas used:', receipt.gasUsed.toString());
console.log('Block number:', receipt.blockNumber);
```

### Estimate Gas Before Sending

```javascript
const gasEstimate = await contract.estimateGas.transfer(
    recipient,
    amount
);
console.log('Estimated gas:', gasEstimate.toString());
```

### Read Past Events

```javascript
const filter = contract.filters.ValueChanged();
const events = await contract.queryFilter(filter, 0, 'latest');
events.forEach(event => {
    console.log('Value:', event.args.newValue);
});
```

## Testing the Frontend

### Manual Testing Checklist

- [ ] Wallet connects successfully
- [ ] Correct network displayed
- [ ] Contract calls work
- [ ] Transactions confirm
- [ ] Events are caught
- [ ] Errors display properly
- [ ] UI updates correctly
- [ ] Works on mobile

### Browser Console

Open DevTools (F12) to:
- See console.log messages
- Debug JavaScript errors
- Monitor network requests
- Inspect contract calls

## Deployment

### Serve Locally

```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server
```

Then open `http://localhost:8000`

### Deploy to GitHub Pages

1. Push frontend to `gh-pages` branch
2. Enable GitHub Pages in settings
3. Your dApp will be at `https://username.github.io/repo`

### Deploy to IPFS

```bash
# Install IPFS
npm install -g ipfs

# Add frontend
ipfs add -r frontend/

# Pin to Pinata or other service
```

## Troubleshooting

### MetaMask Not Detected
- Make sure extension is installed
- Try refreshing the page
- Check browser console for errors

### Transactions Failing
- Check gas settings in MetaMask
- Verify contract address is correct
- Ensure sufficient ETH balance
- Check network is correct

### Wrong Network
```javascript
// Add network switching
async function switchNetwork(chainId) {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
    } catch (error) {
        // Handle error
    }
}
```

## Next Steps

- Add wallet balance display
- Implement transaction history
- Add loading animations
- Create responsive mobile design
- Add dark mode toggle
- Integrate with The Graph for queries
- Add ENS name resolution

## Resources

- [Ethers.js Docs](https://docs.ethers.org/)
- [MetaMask Docs](https://docs.metamask.io/)
- [Web3 Design Patterns](https://www.web3designpatterns.com/)
