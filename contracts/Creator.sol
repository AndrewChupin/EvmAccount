// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.21;

import {Account} from "./Account.sol";
//import "hardhat/console.sol";

contract Creator {

    event TestDeployed(address);

    function createContract(uint256 _num, uint256 _salt) external returns (Account) {
        address contractAddress = prepareAddress(_num, _salt);

        uint length = contractAddress.code.length;
        if (length > 0) {
            return Account(payable(contractAddress));
        }

        Account account = new Account{salt : bytes32(_salt)}(_num);
        emit TestDeployed(address(account));

        return account;
    }

    function prepareAddress(uint256 _num, uint256 _salt) public view returns (address) {
        bytes memory bytecode = getBytecode(_num);
        address a = address(this);

        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                a,
                _salt,
                keccak256(bytecode)
            )
        );

        return address(uint160(uint256(hash)));
    }

    function getBytecode(uint256 _num) public pure returns (bytes memory) {
        bytes memory bytecode = type(Account).creationCode;

        return abi.encodePacked(
            bytecode,
            abi.encode(_num)
        );
    }
}