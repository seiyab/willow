// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./Decoder.sol";
import "./Rect.sol";
import "./Ellipse.sol";

contract Willow {
  Decoder[] decoders;

  Painting[] paintings;

  struct Painting {
    address owner;
    address creator;
    bytes[] data;
  }

  constructor() {
    decoders.push(new Rect());
    decoders.push(new Ellipse());
  }

  function create(bytes[] calldata data) external returns (uint256) {
    require(data.length > 0);
    uint256 id = paintings.length;
    Painting storage p = paintings.push();
    for (uint i=0; i < data.length; i++) {
      bool valid = false;
      for (uint j=0; j < decoders.length; j++) {
        if (decoders[j].valid(data[i])) {
          valid = true;
          break;
        }
      }
      require(valid);
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
      for (uint j = 0; j < decoders.length; j++) {
        (item, ok) = decoders[j].decode(p.data[i]);
        if (ok) {
          break;
        }
      }
      if (ok) {
        pack = abi.encodePacked(pack, item);
        continue;
      }
    }
    pack = abi.encodePacked(pack, '</svg>');
    return string(pack);
  }
}
