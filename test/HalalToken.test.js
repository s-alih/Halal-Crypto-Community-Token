const { deployments, ethers, getNamedAccounts, network } = require("hardhat");
const { assert, expect } = require("chai");

describe("Halal Token Test", () => {
  let halalToken;
  const sendValue = ethers.utils.parseEther("1");
  beforeEach(async () => {
    let HalalToken = await ethers.getContractFactory("HCC");
    halalToken = await HalalToken.deploy();
    await halalToken.deployed();
  });

  describe("Mint and burn", async () => {
    it("minting and buring token successfully", async () => {
      const response = await halalToken.deposit({ value: sendValue });
      assert.equal("1.0", ethers.utils.formatEther(response.value));
      const response2 = await halalToken.withdraw(1);
      assert.equal("0.0", ethers.utils.formatEther(response2.value));
    });
  });
});
