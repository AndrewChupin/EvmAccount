// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.21;

interface IAccount {
    function getId() external view returns (uint256);
}

contract Account is IAccount {

    uint256 private immutable id;

    constructor(
        uint256 _id
    ) {
        id = _id;
    }

    function getId() external view returns (uint256) {
        return id;
    }
}
