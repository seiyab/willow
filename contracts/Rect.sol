// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./Decoder.sol";
import "./Lib.sol";

contract Rect is Decoder {
  using Strings for uint8;

  function valid(bytes memory d) public pure override returns (bool) {
    if (d[0] != 0x01) {
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
        '<rect x="',
        uint8(d[1]).toString(),
        '" y="',
        uint8(d[2]).toString(),
        '" width="',
        uint8(d[3]).toString(),
        '" height="',
        uint8(d[4]).toString(),
        '" fill="',
        Lib.colorString(d[5], d[6]),
        '" />'
      ),
      true
    );
  }
}