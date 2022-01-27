pragma solidity 0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol"; 

contract Faucet {

    mapping(address => uint256) lastRequest;

    function requestToken(address tokenAddress, address tokenReceiver) public virtual {
        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(address(this)) >= 1000000000000000000, 'not enough token in the faucet');
        require(lastRequest[tokenReceiver] == 0 || block.timestamp - 24 * 1 hours > lastRequest[tokenReceiver], "only once in 24 hours");
        lastRequest[tokenReceiver] = block.timestamp; 
        token.transfer(tokenReceiver, 1000000000000000000);
    }
}