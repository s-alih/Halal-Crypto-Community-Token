const { deployments, ethers, getNamedAccounts, network } = require("hardhat");
const { assert, expect } = require("chai");

describe("Halal Token Test", () => {
  let halalToken;
  const sendValue = ethers.utils.parseEther("1");

  describe("Minting", () => {
    beforeEach(async () => {
      let HalalToken = await ethers.getContractFactory("HCC");
      halalToken = await HalalToken.deploy();
      await halalToken.deployed();
    });

    it("minting token successfully", async () => {
      const response = await halalToken.deposit({ value: sendValue });
      assert.equal("1.0", ethers.utils.formatEther(response.value));
    });
  });

  describe("Burn", () => {
    beforeEach(async () => {
      let HalalToken = await ethers.getContractFactory("HCC");
      halalToken = await HalalToken.deploy();
      await halalToken.deployed();
      const response = await halalToken.deposit({ value: sendValue });
      assert.equal("1.0", ethers.utils.formatEther(response.value));
    });

    it("Token burn successfully", async () => {
      const response = await halalToken.withdraw(1);
      assert.equal("0.0", ethers.utils.formatEther(response.value));
    });
  });

  describe("Send Token", () => {
    beforeEach(async () => {
      let HalalToken = await ethers.getContractFactory("HCC");
      halalToken = await HalalToken.deploy();
      await halalToken.deployed();
      const response = await halalToken.deposit({ value: sendValue });
      assert.equal("1.0", ethers.utils.formatEther(response.value));
    });

    it("Token send successfully", async () => {
      let randomAddress = "0x5ddb49f23a2e5d83f348a0287085056a0612b365";
      const response = await halalToken.transfer(randomAddress, 90000000000000);
      let balance = await halalToken.balanceOf(randomAddress);

      assert.equal(
        90000000000000,
        ethers.utils.formatEther(balance) * 10 ** 18
      );
    });
  });
});
