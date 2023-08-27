// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import { Test } from "./Test.sol";

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Creator {

    event TestDeployed(address);

    function createContract(uint256 num, uint256 _salt) public returns (Test test) {
        address contractAddress = getAddress(num, _salt);

        uint result = contractAddress.code.length;
        if (result > 0) {
            return Test(payable(contractAddress));
        }

        test = new Test{salt : bytes32(_salt)}(num);
        emit TestDeployed(address(test));
    }

    function getAddress(uint256 num, uint256 salt) private view returns (address) {
        bytes memory bytecode = getBytecode(num);

        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                salt,
                keccak256(bytecode)
            )
        );

        return address(uint160(uint256(hash)));
    }

    function getBytecode(uint256 num) private pure returns (bytes memory) {
        bytes memory bytecode = type(Test).creationCode;
        
        return abi.encodePacked(
            bytecode,
            abi.encode(num)
        );
    }
}