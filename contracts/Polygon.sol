// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./Decoder.sol";
import "./Lib.sol";

contract Polygon is Decoder {
  using Strings for uint8;

  function valid(bytes memory d) public pure override returns (bool) {
    if (d.length < 3) {
        return false;
    }
    if (d[0] != 0x03) {
      return false;
    }
    return true;
  }

  function decode(bytes memory d) public pure override returns (bytes memory element, bool) {
    if (!valid(d)) {
      return ("", false);
    }
    uint length = (d.length - 3) / 2;
    bytes[] memory points = new bytes[](length);
    for (uint i=0; i<length; ++i) {
      points[i] = abi.encodePacked(
        uint8(d[3 + i*2]).toString(),
        ",",
        uint8(d[4 + i*2]).toString(),
        " "
      );
    }
    return (abi.encodePacked(
      '<polygon fill="',
      Lib.colorString(d[1], d[2]),
      '" points="',
      Lib.concat(points),
      '"/>'
    ), true);
  }
}