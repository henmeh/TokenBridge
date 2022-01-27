pragma solidity 0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol"; 

contract MyToken is ERC20 {

    address public admin;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        admin = msg.sender;
    }

    function burn(address owner, uint256 amount) public virtual {
        require(msg.sender == admin, 'only admin for token'); 
        _burn(owner, amount);
    }

    function mint(address to, uint256 amount) public virtual {
        require(msg.sender == admin, 'only admin for token');
        _mint(to, amount);
    }

    function updateAdmin(address newAdmin) external {
        require(msg.sender == admin, 'only admin for token');
        admin = newAdmin;
  }
}