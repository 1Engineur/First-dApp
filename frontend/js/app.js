// Contract addresses - Update these after deployment
const SIMPLE_STORAGE_ADDRESS = "YOUR_SIMPLE_STORAGE_CONTRACT_ADDRESS";
const MY_TOKEN_ADDRESS = "YOUR_MY_TOKEN_CONTRACT_ADDRESS";

// Contract ABIs (simplified for demo)
const SIMPLE_STORAGE_ABI = [
    "function set(uint256 x) public",
    "function get() public view returns (uint256)",
    "event ValueChanged(uint256 newValue, address changedBy)"
];

const MY_TOKEN_ABI = [
    "function balanceOf(address account) public view returns (uint256)",
    "function transfer(address to, uint256 amount) public returns (bool)",
    "function name() public view returns (string)",
    "function symbol() public view returns (string)",
    "function decimals() public view returns (uint8)"
];

// Global variables
let provider;
let signer;
let simpleStorageContract;
let myTokenContract;
let userAccount;

// Initialize the app
async function init() {
    setupEventListeners();
    await loadDeploymentAddresses();
}

// Load deployment addresses from file
async function loadDeploymentAddresses() {
    try {
        const response = await fetch('../deployment-addresses.json');
        const data = await response.json();
        if (data.SimpleStorage && data.MyToken) {
            SIMPLE_STORAGE_ADDRESS = data.SimpleStorage;
            MY_TOKEN_ADDRESS = data.MyToken;
            console.log("Loaded deployment addresses:", data);
        }
    } catch (error) {
        console.log("No deployment addresses file found. Please deploy contracts first.");
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.getElementById('setValueBtn').addEventListener('click', setStorageValue);
    document.getElementById('getValueBtn').addEventListener('click', getStorageValue);
    document.getElementById('getBalanceBtn').addEventListener('click', getTokenBalance);
    document.getElementById('transferBtn').addEventListener('click', transferTokens);
}

// Connect to MetaMask
async function connectWallet() {
    try {
        if (typeof window.ethereum === 'undefined') {
            showStatus('Please install MetaMask!', 'error');
            return;
        }

        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Create provider and signer
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        userAccount = await signer.getAddress();
        
        // Get network
        const network = await provider.getNetwork();
        
        // Initialize contracts
        simpleStorageContract = new ethers.Contract(
            SIMPLE_STORAGE_ADDRESS,
            SIMPLE_STORAGE_ABI,
            signer
        );
        
        myTokenContract = new ethers.Contract(
            MY_TOKEN_ADDRESS,
            MY_TOKEN_ABI,
            signer
        );
        
        // Update UI
        document.getElementById('connectWallet').style.display = 'none';
        document.getElementById('walletInfo').style.display = 'block';
        document.getElementById('accountAddress').textContent = 
            userAccount.slice(0, 6) + '...' + userAccount.slice(-4);
        document.getElementById('networkName').textContent = network.name;
        
        showStatus('Wallet connected successfully!', 'success');
        
        // Listen for account changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        
    } catch (error) {
        console.error('Error connecting wallet:', error);
        showStatus('Error connecting wallet: ' + error.message, 'error');
    }
}

// Set storage value
async function setStorageValue() {
    try {
        const value = document.getElementById('storageValue').value;
        if (!value) {
            showStatus('Please enter a value', 'error');
            return;
        }
        
        showStatus('Setting value... Please confirm transaction', 'info');
        const tx = await simpleStorageContract.set(value);
        showStatus('Transaction sent. Waiting for confirmation...', 'info');
        await tx.wait();
        showStatus('Value stored successfully!', 'success');
        
    } catch (error) {
        console.error('Error setting value:', error);
        showStatus('Error: ' + error.message, 'error');
    }
}

// Get storage value
async function getStorageValue() {
    try {
        showStatus('Retrieving value...', 'info');
        const value = await simpleStorageContract.get();
        document.getElementById('storedValue').textContent = 
            'Stored Value: ' + value.toString();
        showStatus('Value retrieved successfully!', 'success');
        
    } catch (error) {
        console.error('Error getting value:', error);
        showStatus('Error: ' + error.message, 'error');
    }
}

// Get token balance
async function getTokenBalance() {
    try {
        showStatus('Retrieving balance...', 'info');
        const balance = await myTokenContract.balanceOf(userAccount);
        const symbol = await myTokenContract.symbol();
        document.getElementById('tokenBalance').textContent = 
            'Your Balance: ' + ethers.utils.formatEther(balance) + ' ' + symbol;
        showStatus('Balance retrieved successfully!', 'success');
        
    } catch (error) {
        console.error('Error getting balance:', error);
        showStatus('Error: ' + error.message, 'error');
    }
}

// Transfer tokens
async function transferTokens() {
    try {
        const recipient = document.getElementById('transferAddress').value;
        const amount = document.getElementById('transferAmount').value;
        
        if (!recipient || !amount) {
            showStatus('Please enter recipient address and amount', 'error');
            return;
        }
        
        showStatus('Transferring tokens... Please confirm transaction', 'info');
        const tx = await myTokenContract.transfer(
            recipient,
            ethers.utils.parseEther(amount)
        );
        showStatus('Transaction sent. Waiting for confirmation...', 'info');
        await tx.wait();
        showStatus('Tokens transferred successfully!', 'success');
        
        // Clear inputs
        document.getElementById('transferAddress').value = '';
        document.getElementById('transferAmount').value = '';
        
    } catch (error) {
        console.error('Error transferring tokens:', error);
        showStatus('Error: ' + error.message, 'error');
    }
}

// Handle account changes
function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        showStatus('Please connect to MetaMask', 'error');
        location.reload();
    } else {
        location.reload();
    }
}

// Handle chain changes
function handleChainChanged() {
    location.reload();
}

// Show status message
function showStatus(message, type) {
    const statusElement = document.getElementById('statusMessage');
    statusElement.textContent = message;
    statusElement.className = 'status ' + type;
    
    // Auto-clear after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            statusElement.textContent = '';
            statusElement.className = 'status';
        }, 5000);
    }
}

// Initialize app when page loads
window.addEventListener('load', init);
