import { ethers } from "hardhat";
import {Account, Creator} from "../typechain-types";
import {attachContract, deployContract, findEvent} from "../test/utils/contracts";
import {Address, uint256} from "../test/utils/types";

// sepolia
// Creator address: 0xF2aC1C23876D8A0c4f5c989cc767b7d7198ceA57
// Account address: 0x1E6208908735fBa4858b5F259Fb622A77E87c28c
async function main() {
  const provider = ethers.provider

  const signer = await provider.getSigner()
  console.log("Deploying contracts with the account:", signer.address)

  const contract = await deployContract<Creator>("Creator")
  console.log("Creator address:", await contract.getAddress())

  const id = uint256(32n)
  const salt = uint256(0n)

  const call = await contract.createContract(id, salt)
  let receipt = await call.wait();

  let event = findEvent("TestDeployed", receipt?.logs)
  const address = event!!.args.at(0) as Address
  console.log("Account address:", address)

  const account = await attachContract<Account>("Account", address)
  const accountId = await account.getId()
  console.log("AccountId:", accountId)

  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;
  //
  // const lockedAmount = ethers.utils.parseEther("");
  //
  // const lock = await ethers.deployContract("Lock", [unlockTime], {
  //   value: lockedAmount,
  // });
  //
  // await lock.waitForDeployment();
  //
  // console.log(
  //   `Lock with ${ethers.utils.formatEther(lockedAmount)} ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
