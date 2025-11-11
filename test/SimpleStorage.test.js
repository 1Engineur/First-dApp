const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
  let simpleStorage;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
  });

  describe("Deployment", function () {
    it("Should start with a value of 0", async function () {
      expect(await simpleStorage.get()).to.equal(0);
    });
  });

  describe("Set and Get", function () {
    it("Should store the value 42", async function () {
      await simpleStorage.set(42);
      expect(await simpleStorage.get()).to.equal(42);
    });

    it("Should emit ValueChanged event", async function () {
      await expect(simpleStorage.set(100))
        .to.emit(simpleStorage, "ValueChanged")
        .withArgs(100, owner.address);
    });

    it("Should update the value multiple times", async function () {
      await simpleStorage.set(10);
      expect(await simpleStorage.get()).to.equal(10);
      
      await simpleStorage.set(20);
      expect(await simpleStorage.get()).to.equal(20);
    });
  });
});
