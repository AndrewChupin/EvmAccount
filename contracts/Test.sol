// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

interface ITest {
    function param() external view returns (uint256);
}

contract Test is ITest {

    uint256 private immutable number;

    constructor(
        uint256 _number
    ) {
        number = _number;
    }

    function param() external view returns (uint256) {
        return number;
    }
}
