// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Base64.sol";
import "./Lib.sol";
import "./Repository.sol";
import "./Drawer.sol";
import "./Rect.sol";
import "./Ellipse.sol";

contract Willow {
  Repository repository;
  Drawer drawer;

  constructor() {
    repository = new Repository();
    drawer = new Drawer(repository);

    drawer.addDecoder(new Rect());
    drawer.addDecoder(new Ellipse());
  }

  function create(bytes[] calldata data) external returns (uint256) {
    drawer.validate(data);
    return repository.append(data);
  }

  function draw(uint256 paintingID) public view returns (string memory) {
    return drawer.draw(paintingID);
  }


  function length() public view returns (uint256) {
    return repository.length();
  }
}
