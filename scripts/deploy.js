const hre = require("hardhat");
const { verify } = require("../utils/verify");

async function main() {
  console.log("// ----------------- DEPLOY HCC TOKEN ----------------- //");
  const HalalToken = await hre.ethers.getContractFactory("HCC");
  const halalToken = await HalalToken.deploy();

  await halalToken.deployed();

  console.log("HCC deployed to:", halalToken.address);
  console.log(
    "Haqq explorer link\n",
    `https://explorer.haqq.network/address/${halalToken.address}`
  );

  console.log(
    "// ----------------- VERIFYING THE CONTRACT ----------------- //"
  );
  try {
    await verify(halalToken.address);

    console.log("Contract verified successfully");
  } catch (e) {
    console.log("Contract verification can't perform right now");
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
