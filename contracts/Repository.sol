// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Repository {
  Painting[] paintings;

  struct Painting {
    address owner;
    address creator;
    bytes[] data;
  }

  function append(bytes[] calldata data) external returns (uint256) {
    Painting storage p = paintings.push();
    uint256 id = paintings.length;
    p.owner = msg.sender;
    p.creator = msg.sender;
    for (uint i = 0; i < data.length; ++i) {
      p.data.push(data[i]);
    }
    return id;
  }

  function get(uint256 id) external view returns (Painting memory) {
    return paintings[id];
  }

  function length() external view returns (uint256) {
    return paintings.length;
  }
}