// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";

contract Willow {
  using Strings for uint8;
  using Strings for uint16;
  using Strings for uint32;

  Painting[] paintings;

  struct Painting {
    address owner;
    address creator;
    bytes[] data;
  }

  constructor() {
  }

  function create(bytes[] calldata data) external returns (uint256) {
    uint256 id = paintings.length;
    Painting storage p = paintings.push();
    for (uint i=0; i < data.length; i++) {
      require(validRect(data[i]));
      p.data.push(data[i]);
    }
    return id;
  }

  function draw(uint256 paintingID) public view returns (string memory) {
    bytes memory pack = abi.encodePacked('<svg width="250" height="250" xmlns="http://www.w3.org/2000/svg">');
    Painting storage p = paintings[paintingID];
    for (uint i = 0; i < p.data.length; i++) {
      bytes memory item;
      bool ok;
      (item, ok) = rect(p.data[i]);
      if (ok) {
        pack = abi.encodePacked(pack, item);
        continue;
      }
    }
    pack = abi.encodePacked(pack, '</svg>');
    return string(pack);
  }

  function rect(bytes memory d) public pure returns (bytes memory str, bool ok) {
    if (!validRect(d)) {
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
        colorString(d[5], d[6]),
        '" stroke="',
        colorString(d[7], d[8]),
        '" />'
      ),
      true
    );
  }

  function validRect(bytes memory d) public pure returns (bool ok) {
    if (d[0] != 0x01) {
      return false;
    }
    if (d.length != 9) {
      return false;
    }
    return true;
  }

  function colorString(bytes1 x, bytes1 y) internal pure returns (string memory) {
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
}
