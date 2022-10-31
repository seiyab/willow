// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Decoder {
    function willConsume(bytes memory d, uint pos) external pure returns (uint);
    function decode(bytes memory d, uint pos) external view returns (bytes memory element, uint progress);
}