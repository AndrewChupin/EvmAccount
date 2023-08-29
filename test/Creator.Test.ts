import {expect} from "chai";
import {Account, Creator} from "../typechain-types";
import {attachContract, deployContract} from "./utils/contracts";
import {addr, uint256} from "./utils/types";
import {ethers} from "hardhat";

describe("Verify contract", function () {
    it("Should be success", async function() {
        const [signer] = await ethers.getSigners()
        console.log("Signing by:", signer.address)

        const sign = await signer.signMessage(signer.address)
        console.log("Sign:", sign)

        // For Solidity, we need the expanded-format of a signature
        const sig = ethers.Signature.from(sign)

        expect(ethers.verifyMessage(signer.address, sign)).to
            .equal(signer.address)

        // Call the verifyString function
        // let recovered = await contract.verifyString(message, sig.v, sig.r, sig.s);

        // console.log(recovered);
    })
})

describe.skip("Deploy contract", function() {
    it("Should be success", async function () {
        // const contract = (await ethers.deployContract("Creator")) as Creator
        // await contract.waitForDeployment()

        const contract = await deployContract<Creator>("Creator")
        const id = uint256(32n)
        const salt = uint256(0n)

        const address = await contract.prepareAddress(id, salt)
        console.log("Deterministic address: ", address)
        expect(address).to
            .equal(addr("0x11AE8e520263cAD4fca1cC687618A5146bbdfbee"))

        const result = await contract.createContract(id, salt)
        expect(result).to
            .emit(contract, "TestDeployed")
            .withArgs(addr("0x11AE8e520263cAD4fca1cC687618A5146bbdfbee"))

        const account = await attachContract<Account>(
            "Account", addr("0x11AE8e520263cAD4fca1cC687618A5146bbdfbee")
        )
        expect(await account.getId()).to
            .equal(id)

        // const call = await contract.createContract(id, salt)
        // let receipt = await call.wait();
        // let result = await receipt?.getResult()

        // let event = receipt?.logs!!
        //     .filter((event) => event instanceof EventLog && event.eventName === "TestDeployed")
        //     .at(0) as EventLog

        // console.log("Deployed address: ", result)
        // console.log("Deployed events address: ", event.eventName, event.args.at(0))


        // const testFac = await ethers.getContractFactory("Account")
        // const contractTest = testFac.attach(call) as Account
        // const result = await contractTest.param()
        // console.log("Result:", result)

        // const result = hardhatToken.createContract(13, 0)
    })
})

// describe("Lock", function () {
//   // We define a fixture to reuse the same setup in every test.
//   // We use loadFixture to run this setup once, snapshot that state,
//   // and reset Hardhat Network to that snapshot in every test.
//   async function deployOneYearLockFixture() {
//     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//     const ONE_GWEI = 1_000_000_000;
//
//     const lockedAmount = ONE_GWEI;
//     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
//
//     // Contracts are deployed using the first signer/account by default
//     const [owner, otherAccount] = await ethers.getSigners();
//
//     const Lock = await ethers.getContractFactory("Lock");
//     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
//
//     return { lock, unlockTime, lockedAmount, owner, otherAccount };
//   }
//
//   describe("Deployment", function () {
//     it("Should set the right unlockTime", async function () {
//       const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);
//
//       expect(await lock.unlockTime()).to.equal(unlockTime);
//     });
//
//     it("Should set the right owner", async function () {
//       const { lock, owner } = await loadFixture(deployOneYearLockFixture);
//
//       expect(await lock.owner()).to.equal(owner.address);
//     });
//
//     it("Should receive and store the funds to lock", async function () {
//       const { lock, lockedAmount } = await loadFixture(
//         deployOneYearLockFixture
//       );
//
//       expect(await ethers.provider.getBalance(lock.target)).to.equal(
//         lockedAmount
//       );
//     });
//
//     it("Should fail if the unlockTime is not in the future", async function () {
//       // We don't use the fixture here because we want a different deployment
//       const latestTime = await time.latest();
//       const Lock = await ethers.getContractFactory("Lock");
//       await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
//         "Unlock time should be in the future"
//       );
//     });
//   });
//
//   describe("Withdrawals", function () {
//     describe("Validations", function () {
//       it("Should revert with the right error if called too soon", async function () {
//         const { lock } = await loadFixture(deployOneYearLockFixture);
//
//         await expect(lock.withdraw()).to.be.revertedWith(
//           "You can't withdraw yet"
//         );
//       });
//
//       it("Should revert with the right error if called from another account", async function () {
//         const { lock, unlockTime, otherAccount } = await loadFixture(
//           deployOneYearLockFixture
//         );
//
//         // We can increase the time in Hardhat Network
//         await time.increaseTo(unlockTime);
//
//         // We use lock.connect() to send a transaction from another account
//         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
//           "You aren't the owner"
//         );
//       });
//
//       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//         const { lock, unlockTime } = await loadFixture(
//           deployOneYearLockFixture
//         );
//
//         // Transactions are sent using the first signer by default
//         await time.increaseTo(unlockTime);
//
//         await expect(lock.withdraw()).not.to.be.reverted;
//       });
//     });
//
//     describe("Events", function () {
//       it("Should emit an event on withdrawals", async function () {
//         const { lock, unlockTime, lockedAmount } = await loadFixture(
//           deployOneYearLockFixture
//         );
//
//         await time.increaseTo(unlockTime);
//
//         await expect(lock.withdraw())
//           .to.emit(lock, "Withdrawal")
//           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//       });
//     });
//
//     describe("Transfers", function () {
//       it("Should transfer the funds to the owner", async function () {
//         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
//           deployOneYearLockFixture
//         );
//
//         await time.increaseTo(unlockTime);
//
//         await expect(lock.withdraw()).to.changeEtherBalances(
//           [owner, lock],
//           [lockedAmount, -lockedAmount]
//         );
//       });
//     });
//   });
// });
