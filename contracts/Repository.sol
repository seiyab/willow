// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Admin.sol";

contract Repository {
  Admin private admin;
  bytes[][] private data;
  uint private max;

  constructor() {
    max = 100;
  }

  function setAdmin(address a) public {
    require(address(admin) == address(0));
    admin = Admin(a);
  }

  function setMax(uint newMax) public {
    require(msg.sender == getAdmin(), 'only admin can setMax');
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

  function getAdmin() public view returns (address) {
    return admin.getAdmin();
  }
}