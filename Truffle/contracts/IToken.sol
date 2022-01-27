// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IToken {
    function burn(address owner, uint256 amount) external;

    function mint(address to, uint256 amount) external;

    function transfer(address recipient, uint256 amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint256);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}
