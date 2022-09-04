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
      if (validQuote(data[i])) {
        p.data.push(data[i]);
        continue;
      }

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
    bytes memory pack = abi.encodePacked(
      '<svg width="250" height="250" xmlns="http://www.w3.org/2000/svg">',
      elements(paintingID),
      '</svg>'
    );
    return string(pack);
  }

  function elements(uint256 paintingID) internal view returns (string memory) {
    bytes memory pack;
    Painting storage p = paintings[paintingID];
    for (uint i = 0; i < p.data.length; i++) {
      bytes memory item;
      bool ok;

      (item, ok) = quote(p.data[i]);
      if (ok) {
        pack = abi.encodePacked(pack, item);
        continue;
      }

      for (uint j = 0; j < decoders.length; j++) {
        (item, ok) = decoders[j].decode(p.data[i]);
        if (ok) {
          break;
        }
      }
      if (ok) {
        pack = abi.encodePacked(pack, item);
      }
    }
    return string(pack);
  }

  function validQuote(bytes memory d) internal pure returns (bool ok) {
    if (d[0] != 0x00) {
      return false;
    }
    uint addr_length = 256 / 8;
    if (d.length != addr_length + 1) {
      return false;
    }
    return true;
  }

  function quote(bytes memory d) internal view returns (bytes memory element, bool ok) {
    if (!validQuote(d)) {
      return ("", false);
    }
    uint addr_length = 256 / 8;
    uint256 id = 0;
    for (uint i = 0; i < addr_length; i++) {
      id <<= 8;
      id += uint8(d[i+1]);
    }
    return (
      abi.encodePacked(elements(id)),
      true
    );
  }
}
