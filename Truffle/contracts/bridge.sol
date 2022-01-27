pragma solidity >=0.6.0 <0.9.0;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IToken.sol"; 

contract Bridge {

    uint256 public nonce;
    //mapping ChainId => Nonce => Bool
    mapping(uint256 => mapping(uint256 => bool)) public processedNonces;
    address public admin;
    
    //mapping Useraddress => Tokenaddress => Tokenbalance
    mapping(address => mapping(address => uint256)) tokenBalance;
    
    //mapping Useraddress => Ethbalance
    mapping(address => uint256) ethBalance;

    event Transfer(address fromTokenAddress, address toTokenAddress, address owner, uint256 fromChain, uint256 toChain, uint256 amount, string step, uint256 nonce);
    event Received(address, uint);

    constructor() {
        admin = msg.sender;
    }  

    function depositERC20(address fromTokenAddress, address toTokenAddress, address owner, uint256 fromChain, uint256 toChain, uint256 amount) public {
        IToken token = IToken(fromTokenAddress);
        require(token.allowance(msg.sender, address(this)) >= amount, "Bridgecontract has too low allowance");
        token.transferFrom(msg.sender, address(this), amount);
        tokenBalance[msg.sender][fromTokenAddress] += amount;
        emit Transfer(fromTokenAddress, toTokenAddress, owner, fromChain, toChain, amount, "burn", nonce);
        nonce++; 
    }
    
    function depositEth(address fromTokenAddress, address toTokenAddress, address owner, uint256 fromChain, uint256 toChain, uint256 amount) public payable {
        ethBalance[msg.sender] += msg.value;
        emit Transfer(fromTokenAddress, toTokenAddress, owner, fromChain, toChain, amount, "burn", nonce);
        nonce++; 
    }

    function withdrawERC20(address fromTokenAddress, address toTokenAddress, address owner, uint256 fromChain, uint256 toChain, uint256 amount, uint256 otherChainNonce) public {
        require(tokenBalance[owner][toTokenAddress] >= amount, "Tokenbalance too low");
        require(processedNonces[fromChain][otherChainNonce] == false, 'transfer already processed');
        processedNonces[fromChain][otherChainNonce] = true;
        tokenBalance[owner][toTokenAddress] -= amount;
        IToken token = IToken(toTokenAddress);
        token.transfer(owner, amount);
        emit Transfer(fromTokenAddress, toTokenAddress, owner, fromChain, toChain, amount, "mint", otherChainNonce);
    }

    function withdrawEth(address fromTokenAddress, address toTokenAddress, address payable owner, uint256 fromChain, uint256 toChain, uint256 amount, uint256 otherChainNonce) public {
        require(ethBalance[owner] >= amount, "Ethbalance too low");
        require(processedNonces[fromChain][otherChainNonce] == false, 'transfer already processed');
        processedNonces[fromChain][otherChainNonce] = true;
        ethBalance[owner] -= amount;
        owner.transfer(amount);
        emit Transfer(fromTokenAddress, toTokenAddress, owner, fromChain, toChain, amount, "mint", otherChainNonce);
    }

    function burn(address fromTokenAddress, address toTokenAddress, address owner, uint256 fromChain, uint256 toChain, uint256 amount) public virtual {
        IToken token = IToken(fromTokenAddress);
        token.burn(owner, amount);
        emit Transfer(fromTokenAddress, toTokenAddress, owner, fromChain, toChain, amount, "burn", nonce);
        nonce++;
    }

    function mint(address fromTokenAddress, address toTokenAddress, address owner, uint256 fromChain, uint256 toChain, uint256 amount, uint256 otherChainNonce) public virtual {
        require(msg.sender == admin, 'only admin for bridge');
        require(processedNonces[fromChain][otherChainNonce] == false, 'transfer already processed');
        processedNonces[fromChain][otherChainNonce] = true;
        IToken token = IToken(toTokenAddress);
        token.mint(owner, amount);
        emit Transfer(fromTokenAddress, toTokenAddress, owner, fromChain, toChain, amount, "mint", otherChainNonce);
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }
}