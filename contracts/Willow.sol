// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";

contract Willow {
  using Strings for uint8;
  using Strings for uint16;
  using Strings for uint32;

  Painting[] paintings;

  struct Painting {
    Square[] squares;
    address owner;
    address creator;
  }

  struct Square {
    uint8 x;
    uint8 y;
    uint8 width;
    uint8 height;
    uint16 color;
  }

  constructor() public {
  }

  function create(Square[] calldata squares) external returns (uint256) {
    uint256 id = paintings.length;
    Painting storage p = paintings.push();
    for (uint i=0; i < squares.length; i++) {
      p.squares.push(squares[i]);
    }
    return id;
  }

  function draw(uint256 paintingID) public view returns (string memory) {
    bytes memory pack = abi.encodePacked('<svg width="250" height="250" xmlns="http://www.w3.org/2000/svg">');
    Painting storage p = paintings[paintingID];
    for (uint i = 0; i < p.squares.length; i++) {
      pack = abi.encodePacked(
        pack,
        '<rect x="',
        p.squares[i].x.toString(),
        '" y="',
        p.squares[i].y.toString(),
        '" width="',
        p.squares[i].width.toString(),
        '" height="',
        p.squares[i].height.toString(),
        '" fill="',
        colorString(p.squares[i].color),
        '" />'
      );
    }
    pack = abi.encodePacked(pack, '</svg>');
    return string(pack);
  }

  function colorString(uint16 colorUint) internal pure returns (string memory) {
    uint32 r = ((colorUint >> 12) % 0x10) * 0x11;
    uint32 g = ((colorUint >> 8) % 0x10) * 0x11;
    uint32 b = ((colorUint >> 4) % 0x10) * 0x11;
    uint32 a = (colorUint % 0x10);
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
