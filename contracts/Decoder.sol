// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract Decoder {
    function valid(bytes memory d) public pure virtual returns (bool);
    function decode(bytes memory d) public view virtual returns (bytes memory element, bool);
}