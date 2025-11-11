// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

/**
 * @title SimpleStorage
 * @dev A simple smart contract to store and retrieve a value
 * This is a great starting point for learning Solidity!
 */
contract SimpleStorage {
    // State variable to store a number
    uint256 private storedData;
    
    // Event emitted when the stored value changes
    event ValueChanged(uint256 newValue, address changedBy);
    
    /**
     * @dev Store a new value
     * @param x The new value to store
     */
    function set(uint256 x) public {
        storedData = x;
        emit ValueChanged(x, msg.sender);
    }
    
    /**
     * @dev Retrieve the stored value
     * @return The stored value
     */
    function get() public view returns (uint256) {
        return storedData;
    }
}
