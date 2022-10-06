// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Repository {
  Painting[] private paintings;

  struct Painting {
    address creator;
    bytes[] data;
  }

  function append(bytes[] calldata data) external returns (uint256) {
    uint256 id = paintings.length;
    Painting storage p = paintings.push();
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