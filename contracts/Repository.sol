// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Repository {
  address admin;
  bytes[][] private data;
  uint private max;

  constructor() {
    admin = msg.sender;
    max = 100;
  }

  function setMax(uint newMax) public {
    require(isAdmin(), 'only admin can setMax');
    require(newMax < 0xffffffff, 'too large newMax');
    max = newMax;
  }

  function append(bytes[] calldata newData) external returns (uint256) {
    uint256 id = data.length;
    require(id < max, 'exceeded max');
    bytes[] storage d = data.push();
    for (uint i = 0; i < newData.length; ++i) {
      d.push(newData[i]);
    }
    return id;
  }

  function get(uint256 id) external view returns (bytes[] memory) {
    return data[id];
  }

  function length() external view returns (uint256) {
    return data.length;
  }

  function isAdmin() public view returns (bool) {
    return msg.sender == admin;
  }

  function getAdmin() public view returns (address) {
    return admin;
  }

  function transferAdmin(address to) public {
    require(isAdmin(), 'only admin can transferAdmin');
    admin = to;
  }
}