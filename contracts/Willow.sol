// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./Lib.sol";
import "./Admin.sol";
import "./Repository.sol";
import "./Drawer.sol";

contract Willow is ERC721Enumerable {
  Repository private repository;
  Drawer private drawer;
  IProxyRegistry private immutable proxyRegistry;

  constructor(address r, address d, address p)
  ERC721('Willow - on-chain svg image storage', 'WILLOW')
  {
    Admin a = new Token0Admin(address(this));
    repository = Repository(r);
    repository.setAdmin(address(a));
    drawer = Drawer(d);
    proxyRegistry = IProxyRegistry(p);
  }

  function create(bytes calldata data) external returns (uint256) {
    preview(data);
    uint256 id = repository.append(data);
    _safeMint(msg.sender, id);
    return id;
  }

  function preview(bytes calldata data) public view returns (string memory) {
    return drawer.draw(data);
  }

  function draw(uint256 tokenID) public view returns (string memory) {
    return drawer.drawToken(tokenID);
  }

  function length() public view returns (uint256) {
    return repository.length();
  }

  function tokenURI(uint256 tokenID) public view override returns (string memory) {
    require(_exists(tokenID), 'token doesn\'t exist');
    string memory name = 'No Title';
    string memory svg = drawer.drawToken(tokenID);
    return string(abi.encodePacked(
      'data:application/json;base64,',
      Base64.encode(bytes(abi.encodePacked(
        '{"name":"',
        name,
        '","description":"On-chain SVG image","image":"data:image/svg+xml;base64,',
        Base64.encode(bytes(svg)),
        '"}'
      )))
    ));
  }

  function isApprovedForAll(address owner, address operator) override(ERC721, IERC721) public view returns (bool) {
    // Whitelist OpenSea proxy contract for easy trading.
    if (proxyRegistry.proxies(owner) == operator) {
      return true;
    }

    return super.isApprovedForAll(owner, operator);
  }
}

contract Token0Admin is Admin {
  IERC721 private erc721;

  constructor(address e) {
    erc721 = IERC721(e);
  }

  function getAdmin() external override view returns (address) {
    return erc721.ownerOf(0);
  }
}

interface IProxyRegistry {
  function proxies(address) external view returns (address); 
}