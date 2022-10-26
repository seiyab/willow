// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./Decoder.sol";
import "./Lib.sol";

contract Ellipse is Decoder {
  using Strings for uint8;
  
  function willConsume(bytes memory d, uint pos) public pure override returns (uint) {
    if (d[pos] != 0x02) {
      return 0;
    }
    if (d.length < pos + 7) {
      return 0;
    }
    return 7;
  }

  function decode(bytes memory d, uint pos) public pure override returns (bytes memory element, uint) {
    uint c = willConsume(d, pos);
    if (c == 0) {
      return ("", 0);
    }
    return (
      abi.encodePacked(
        '<ellipse cx="',
        uint8(d[pos + 1]).toString(),
        '" cy="',
        uint8(d[pos + 2]).toString(),
        '" rx="',
        uint8(d[pos + 3]).toString(),
        '" ry="',
        uint8(d[pos + 4]).toString(),
        '" fill="',
        Lib.colorString(d[pos + 5], d[pos + 6]),
        '" />'
      ),
      c
    );
  }
}