// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./Lib.sol";
import "./Decoder.sol";
import "./Rect.sol";
import "./Repository.sol";
import "./Ellipse.sol";
import "./Polygon.sol";

contract Drawer {
  using Strings for uint8;
  using Strings for uint16;
  using Strings for uint256;

  Decoder[] private decoders;
  Repository private repository;

  constructor(address r) {
    repository = Repository(r);
    decoders.push(new Rect());
    decoders.push(new Ellipse());
    decoders.push(new Polygon());
  }

  function addDecoder(address d) external {
    require(msg.sender == repository.getAdmin(), 'only admin can addDecoder');
    decoders.push(Decoder(d));
  }

  function draw(bytes memory data) public view returns (string memory) {
    bytes memory pack = abi.encodePacked(
      '<svg width="250" height="250" xmlns="http://www.w3.org/2000/svg">',
      Lib.concat(elements(data)),
      '</svg>'
    );
    return string(pack);
  }

  function drawToken(uint256 tokenID) public view returns (string memory) {
    bytes memory data = repository.get(tokenID);
    return draw(data);
  }

  function validate(bytes calldata data) view external {
    require(data.length > 0, 'data.length should not be 0');
    uint n = uint(uint8(data[0]));
    uint i = 1;
    for (uint cnt = 0; cnt < n; cnt++) {
      uint consumed;

      consumed = quoteWillConsume(data, i);

      for (uint j = 0; j < decoders.length; j++) {
        if (consumed > 0) {
          break;
        }
        consumed = decoders[j].willConsume(data, i);
      }

      require(consumed > 0, 'invalid data. no decoder match');
      i += consumed;
    }

    require(i == data.length, 'invalid data. length of bytes does not match');
  }

  function quoteWillConsume(bytes memory d, uint pos) internal pure returns (uint) {
    if (d[pos] != 0x00) {
      return 0;
    }
    uint addr_length = 32;
    uint len = addr_length + 5;
    if (d.length < pos + len) {
      return 0;
    }
    return len;
  }

  function quote(bytes memory d, uint pos) internal view returns (bytes memory element, uint) {
    uint c = quoteWillConsume(d, pos);
    if (c == 0) {
      return ("", 0);
    }
    uint256 id = 0;
    // 32 = 256 / 8
    for (uint i = 0; i < 32; i++) {
      id <<= 8;
      id += uint8(d[pos + i+1]);
    }
    // workaround for stack too deep
    string memory cx;
    string memory cy;
    string memory rotate;
    string memory size;
    string memory halfSize;
    {
      cx = uint8(d[pos+32+1]).toString();
      cy = uint8(d[pos+32+2]).toString();
      rotate = (uint16(uint8(d[pos+32+3])) * 3).toString();
      uint16 uintSize = uint16(uint8(d[pos+32+4])) * 2;
      size = (uintSize).toString();
      halfSize = (uintSize/2).toString();
    }

    return (
      abi.encodePacked(
        '<image href="data:image/svg+xml;base64,',
        Base64.encode(bytes(drawToken(id))),
        '" x="-',
        halfSize,
        '" y="-',
        halfSize,
        '" width="',
        size,
        '" height="',
        size,
        '" transform="translate(',
        cx,
        ',',
        cy,
        ') rotate(',
        rotate,
        ')" />'
      ),
      c
    );
  }
  
  function elements(bytes memory data) internal view returns (bytes[] memory) {
    uint n = uint(uint8(data[0]));
    bytes[] memory result = new bytes[](n);
    uint cursor = 1;
    for (uint i=0; i<n; i++) {
      bytes memory item;
      uint consumed;

      (item, consumed) = quote(data, cursor);

      for (uint j = 0; j < decoders.length; j++) {
        if (consumed > 0) {
          break;
        }
        (item, consumed) = decoders[j].decode(data, cursor);
      }
      require(consumed > 0, 'decoding is stuck');
      cursor += consumed;
      result[i] = item;
    }
    return result;
  }
}