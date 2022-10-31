// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./Decoder.sol";
import "./Lib.sol";

contract Polygon is Decoder {
  using Strings for uint8;

  // [0x03, size, fill0, fill1, x0, y0, x1, y1, ...]

  function willConsume(bytes memory d, uint pos) public pure override returns (uint) {
    if (d.length < pos + 4) {
        return 0;
    }
    if (d[pos] != 0x03) {
      return 0;
    }
    uint8 size = uint8(d[pos + 1]);
    uint c = 4 + uint(size) * 2;
    if (d.length < pos + c) {
      return 0;
    }
    return c;
  }

  function decode(bytes memory d, uint pos) public pure override returns (bytes memory element, uint) {
    uint c = willConsume(d, pos);
    if (c == 0) {
      return ("", 0);
    }
    uint length = uint((int(c) - 4) / 2);
    bytes[] memory points = new bytes[](length);
    for (uint i=0; i<length; ++i) {
      points[i] = abi.encodePacked(
        uint8(d[pos + 4 + i*2]).toString(),
        ",",
        uint8(d[pos + 5 + i*2]).toString(),
        " "
      );
    }
    return (abi.encodePacked(
      '<polygon fill="',
      Lib.colorString(d[pos + 2], d[pos + 3]),
      '" points="',
      Lib.concat(points),
      '"/>'
    ), c);
  }
}