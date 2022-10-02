// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./Lib.sol";
import "./Decoder.sol";
import "./Repository.sol";

contract Drawer {
  using Strings for int16;
  using Strings for uint8;
  using Strings for uint16;

  Decoder[] decoders;
  Repository repository;

  constructor(Repository r) {
    repository = r;
  }

  function addDecoder(Decoder d) external {
    decoders.push(d);
  }

  function draw(uint256 paintingID) public view returns (string memory) {
    bytes memory pack = abi.encodePacked(
      '<svg width="250" height="250" xmlns="http://www.w3.org/2000/svg">',
      Lib.concat(elements(paintingID)),
      '</svg>'
    );
    return string(pack);
  }

  function validate(bytes[] calldata data) view external {
    require(data.length > 0);
    for (uint i=0; i < data.length; i++) {
      if (validQuote(data[i])) {
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
    }
  }

  function validQuote(bytes memory d) internal pure returns (bool ok) {
    if (d[0] != 0x00) {
      return false;
    }
    uint addr_length = 256 / 8;
    uint len = addr_length + 5;
    if (d.length != len) {
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
    uint16 rotate = uint16(uint8(d[addr_length+3])) * 3;
    uint16 size = uint16(uint8(d[addr_length+4])) * 2;
    return (
      abi.encodePacked(
        '<image href="data:image/svg+xml;base64,',
        Base64.encode(bytes(draw(id))),
        '" x="-',
        (size / 2).toString(),
        '" y="-',
        (size / 2).toString(),
        '" width="',
        size.toString(),
        '" height="',
        size.toString(),
        '" transform="translate(',
        uint8(d[addr_length+1]).toString(),
        ',',
        uint8(d[addr_length+2]).toString(),
        ') rotate(',
        rotate.toString(),
        ')" />'
      ),
      true
    );
  }
  
  function elements(uint256 paintingID) internal view returns (bytes[] memory) {
    Repository.Painting memory p = repository.get(paintingID);
    bytes[] memory result = new bytes[](p.data.length);
    for (uint i = 0; i < p.data.length; i++) {
      bytes memory item;
      bool ok;

      (item, ok) = quote(p.data[i]);
      if (ok) {
        result[i] = item;
        continue;
      }

      for (uint j = 0; j < decoders.length; j++) {
        (item, ok) = decoders[j].decode(p.data[i]);
        if (ok) {
          break;
        }
      }
      if (ok) {
        result[i] = item;
      }
    }
    return result;
  }
}