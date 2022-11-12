// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";

library Lib {
  using Strings for uint8;
  using Strings for uint16;
  using Strings for uint32;
  using Strings for uint;

  function colorString(bytes1 x, bytes1 y) public pure returns (string memory) {
    uint32 r = (uint8(x) >> 4) * 0x11;
    uint32 g = (uint8(x) % 0x10) * 0x11;
    uint32 b = (uint8(y) >> 4) * 0x11;
    uint32 a = (uint8(y) % 0x10);
    string[0x10] memory alphaStrings = ["0", "0.067", "0.133", "0.2", "0.267", "0.333", "0.4", "0.467", "0.533", "0.6", "0.667", "0.733", "0.8", "0.867", "0.933", "1.0"];
    return string(abi.encodePacked(
      'rgba(',
      r.toString(),
      ',',
      g.toString(),
      ',',
      b.toString(),
      ',',
      alphaStrings[a],
      ')'
    ));
  }

  function concat(bytes[] memory bs) public pure returns (bytes memory) {
    return concatRecur(bs, 0, bs.length);
  }

  function concatRecur(bytes[] memory bs, uint from, uint to) internal pure returns (bytes memory) {
    // we can change 8 to another uint greater than 1. it will affect computational cost.
    if (to - from < 8) {
      bytes memory buf;
      for (uint i = from; i < to; ++i) {
        buf = abi.encodePacked(buf, bs[i]);
      }
      return buf;
    }
    uint mid = (from + to) / 2;
    return abi.encodePacked(
      concatRecur(bs, from, mid),
      concatRecur(bs, mid, to)
    );
  }
}