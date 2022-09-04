// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Decoder {
    function valid(bytes memory d) external pure returns (bool);
    function decode(bytes memory d) external view returns (bytes memory element, bool ok);
}