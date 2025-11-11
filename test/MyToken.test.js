const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  let myToken;
  let owner;
  let addr1;
  let addr2;
  const INITIAL_SUPPLY = ethers.parseEther("1000000");

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const MyToken = await ethers.getContractFactory("MyToken");
    myToken = await MyToken.deploy(INITIAL_SUPPLY);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await myToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply to the owner", async function () {
      const ownerBalance = await myToken.balanceOf(owner.address);
      expect(await myToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should have correct name and symbol", async function () {
      expect(await myToken.name()).to.equal("MyToken");
      expect(await myToken.symbol()).to.equal("MTK");
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      const transferAmount = ethers.parseEther("50");
      await myToken.transfer(addr1.address, transferAmount);
      expect(await myToken.balanceOf(addr1.address)).to.equal(transferAmount);
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      const initialOwnerBalance = await myToken.balanceOf(owner.address);
      await expect(
        myToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.reverted;
      expect(await myToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });

  describe("Minting", function () {
    it("Should allow owner to mint new tokens", async function () {
      const mintAmount = ethers.parseEther("1000");
      await myToken.mint(addr1.address, mintAmount);
      expect(await myToken.balanceOf(addr1.address)).to.equal(mintAmount);
    });

    it("Should not allow non-owner to mint", async function () {
      const mintAmount = ethers.parseEther("1000");
      await expect(
        myToken.connect(addr1).mint(addr2.address, mintAmount)
      ).to.be.reverted;
    });
  });
});
