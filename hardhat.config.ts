import { HardhatUserConfig } from "hardhat/config";
import * as dotenv from 'dotenv';
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: process.env.DEPLOY_URL,
      accounts: [process.env.DEPLOY_PK]
    }
  },
  gasReporter: {
    // TODO Setup GasPrice
    enabled: JSON.parse(process.env.REPORT_GAS),
    // outputFile: "reports/gas",
    coinmarketcap: process.env.CMC_API
  },
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 0,
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHER_SCAN_API
  }
};

//   details: {
//     // The peephole optimizer is always on if no details are given,
//     // use details to switch it off.
//     peephole: true,
//     // The unused jumpdest remover is always on if no details are given,
//     // use details to switch it off.
//     jumpdestRemover: true,
//     // Sometimes re-orders literals in commutative operations.
//     orderLiterals: true,
//     // Removes duplicate code blocks
//     deduplicate: true,
//     // Common subexpression elimination, this is the most complicated step but
//     // can also provide the largest gain.
//     cse: true,
//     // Optimize representation of literal numbers and strings in code.
//     constantOptimizer: true,
//     // The new Yul optimizer. Mostly operates on the code of ABIEncoderV2
//     // and inline assembly.
//     // It is activated together with the global optimizer setting
//     // and can be deactivated here.
//     // Before Solidity 0.6.0 it had to be activated through this switch.
//     yul: true,
//     // Tuning options for the Yul optimizer.
//     yulDetails: {
//       // Improve allocation of stack slots for variables, can free up stack slots early.
//       // Activated by default if the Yul optimizer is activated.
//       stackAllocation: true,
//     }
//   }

export default config;