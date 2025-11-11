// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MyToken
 * @dev A simple ERC20 token implementation
 * This demonstrates how to create a basic cryptocurrency token
 */
contract MyToken is ERC20, Ownable {
    /**
     * @dev Constructor that gives msg.sender all of initial supply
     * @param initialSupply The initial token supply (in smallest unit)
     */
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }
    
    /**
     * @dev Mint new tokens (only owner can call this)
     * @param to Address to receive the tokens
     * @param amount Amount of tokens to mint
     */
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
