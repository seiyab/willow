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

  /**
   * returns 2 ^ ((b - 96) / 32) as string
   */
  function scaleString(uint8 b) public pure returns (string memory) {
    uint sub2 = b%32;
    uint pow2 = b/32;

    uint scaleX80000 = 100000;
    for (uint i=0; i < sub2; i++) {
      scaleX80000 = scaleX80000 * 10219 / 10000;
    }
    for (uint i=0; i < pow2; i++) {
      scaleX80000 *= 2;
    }
    scaleX80000 /= 10;

    string memory intPart = (scaleX80000 / 80000).toString();
    string memory decimalPart = (scaleX80000 % 80000 * 125).toString();
    bytes memory acc = abi.encodePacked(intPart, ".");
    for (uint i=0; i < 7 - bytes(decimalPart).length; i++) {
      acc = abi.encodePacked(acc, '0');
    }
    return string(abi.encodePacked(acc, decimalPart));
  }

  function intToString(int x) public pure returns (string memory) {
    if (x < 0) {
      return string(abi.encodePacked(
        '-',
        uint(-x).toString()
      ));
    }
    return uint(x).toString();
  }
}