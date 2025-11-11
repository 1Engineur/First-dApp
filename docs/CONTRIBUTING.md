# Contributing to First-dApp

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/First-dApp.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test your changes
6. Commit your changes
7. Push to your fork
8. Open a Pull Request

## Development Workflow

### Before Making Changes

1. Make sure you're on the latest main branch:
   ```bash
   git checkout main
   git pull origin main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests to ensure everything works:
   ```bash
   npm test
   ```

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following our coding standards (see below)

3. Test your changes:
   ```bash
   npm test
   npm run compile
   ```

4. Update documentation if needed

### Committing Changes

1. Stage your changes:
   ```bash
   git add .
   ```

2. Commit with a descriptive message:
   ```bash
   git commit -m "Add feature: description of your change"
   ```

   Good commit messages:
   - "Add function to mint tokens in batches"
   - "Fix: Prevent reentrancy in transfer function"
   - "Update: Improve gas efficiency in storage contract"
   - "Docs: Add tutorial for deploying to testnet"

3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

### Opening a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill in the PR template:
   - Describe what you changed
   - Explain why you made the change
   - List any breaking changes
   - Reference related issues

## Coding Standards

### Solidity

Follow the [Solidity Style Guide](https://docs.soliditylang.org/en/latest/style-guide.html):

```solidity
// Good
contract MyContract {
    uint256 public myVariable;
    
    event MyEvent(address indexed user, uint256 value);
    
    function myFunction(uint256 _param) public returns (uint256) {
        require(_param > 0, "Parameter must be positive");
        myVariable = _param;
        emit MyEvent(msg.sender, _param);
        return myVariable;
    }
}
```

**Naming Conventions:**
- Contracts: PascalCase (e.g., `SimpleStorage`)
- Functions: camelCase (e.g., `getBalance`)
- Parameters: _underscorePrefix (e.g., `_amount`)
- Constants: UPPER_CASE (e.g., `MAX_SUPPLY`)

**Comments:**
- Use NatSpec for public functions
- Explain complex logic
- Keep comments up to date

```solidity
/**
 * @dev Transfers tokens to a recipient
 * @param _recipient Address to receive tokens
 * @param _amount Number of tokens to transfer
 * @return success Whether transfer succeeded
 */
function transfer(address _recipient, uint256 _amount) 
    public 
    returns (bool success) 
{
    // Implementation
}
```

### JavaScript/Testing

Follow common JavaScript standards:

```javascript
// Good
const contract = await SimpleStorage.deploy();
const value = await contract.get();
expect(value).to.equal(42);
```

**Testing Guidelines:**
- Test one thing per test
- Use descriptive test names
- Test edge cases
- Test error conditions

## Testing Requirements

All contributions must include tests:

### Smart Contracts
- Unit tests for new functions
- Integration tests for complex features
- Test success cases and failures
- Check events are emitted

## Documentation

Update documentation when you:
- Add new features
- Change existing behavior
- Add new dependencies
- Modify deployment process

## What to Contribute

### Good First Issues
- Fix typos in documentation
- Improve error messages
- Add comments to code
- Write more tests
- Update dependencies

### Features
- New example contracts
- Frontend improvements
- Additional network support
- Better error handling
- Gas optimizations

### Bug Fixes
- Security vulnerabilities
- Logic errors
- UI bugs
- Documentation errors

## Code Review Process

1. Maintainers will review your PR
2. They may request changes
3. Make requested changes and push
4. Once approved, PR will be merged

## Code of Conduct

Be respectful and professional:
- Be welcoming and inclusive
- Respect differing opinions
- Accept constructive criticism
- Focus on what's best for the project

## License

By contributing, you agree that your contributions will be licensed under the Apache License 2.0.

Thank you for contributing! 🎉
