// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./Decoder.sol";
import "./Lib.sol";

contract Ellipse is Decoder {
  using Strings for uint8;
  
  function valid(bytes memory d) public pure override returns (bool) {
    if (d[0] != 0x02) {
      return false;
    }
    if (d.length != 7) {
      return false;
    }
    return true;
  }

  function decode(bytes memory d) public pure override returns (bytes memory element, bool) {
    if (!valid(d)) {
      return ("", false);
    }
    return (
      abi.encodePacked(
        '<ellipse cx="',
        uint8(d[1]).toString(),
        '" cy="',
        uint8(d[2]).toString(),
        '" rx="',
        uint8(d[3]).toString(),
        '" ry="',
        uint8(d[4]).toString(),
        '" fill="',
        Lib.colorString(d[5], d[6]),
        '" />'
      ),
      true
    );
  }
}