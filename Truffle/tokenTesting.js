
const Moralis = require('moralis');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const myTokenABI = require("./build/contracts/MyToken.json");
const bridgeABI = require("./build/contracts/Bridge.json");
const faucetABI = require("./build/contracts/Faucet.json");
require('dotenv').config();

// Connecting to the Ethereum Blockchain 
const web3Eth = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, proecess.env.SpeedyNodeETH));
// Connecting to the BSC Blockchain 
const web3BSC = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, proecess.env.SpeedyNodeBSC));
// Connecting to the Polygon Blockchain 
const web3Polygon = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, proecess.env.SpeedyNodePolygon));
// Connecting to my ERC Token on ETH
const myEthToken = new web3Eth.eth.Contract(myTokenABI.abi, "0xDDF279DE1B9423a0C00dd4A2041Fd48744C0b772");
// Connecting to Bridge on Eth
const myEthBridge = new web3Eth.eth.Contract(bridgeABI.abi, "0x151E9edA78675b1a1086C1bF0CCf1edA3a05E917");

const faucet = new web3Eth.eth.Contract(faucetABI.abi, "0xc3aF433cd8B3557cBE9dFf248C2537E9877287dc");


const getTokenBalance = async function () {
    try {
        const balance = await myEthToken.methods.balanceOf("0xC4e2c53664d929e1D7D0AE9fBC848690EF3f81C1").call();         
        console.log(balance);
    } catch (error) { console.log(error); }
}

const burnToken = async function () {
    try {
        const burn = await myEthBridge.methods.burn(
            "0x29FcE5E088C7d27c34b83eBF1cD2cc405CefADb7",
            "0x4680787038d6E2680EBf871Ce825CAB7E87181F0", 
            "0xC4e2c53664d929e1D7D0AE9fBC848690EF3f81C1",
            "80001",
            "10000000000000000000").send({from : process.env.MY_ADDRESS});
        console.log(burn);
    } catch (error) { console.log(error); }
}

const mintToken = async function () {
    try {
        const mint = await myEthBridge.methods.mint(
            "0xc3aB926F96113A0a5F05ce9848ffe82f97d9aD08",
            "0xc3aB926F96113A0a5F05ce9848ffe82f97d9aD08", 
            "0xC4e2c53664d929e1D7D0AE9fBC848690EF3f81C1",
            "3",
            "80001",
            "10000000000000000",
            "1").send({from : process.env.MY_ADDRESS});
        console.log(mint);
    } catch (error) { console.log(error); }
}

const depositToken = async function () {
    try {
        // Connecting to the Ethereum Blockchain 
        const web3New = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY_USER, process.env.SpeedyNodeETH));
        const myEthTokenNew = new web3New.eth.Contract(myTokenABI.abi, "0xDDF279DE1B9423a0C00dd4A2041Fd48744C0b772");
        const myEthBridgeNew = new web3New.eth.Contract(bridgeABI.abi, "0x151E9edA78675b1a1086C1bF0CCf1edA3a05E917");
        await myEthTokenNew.methods.approve("0x151E9edA78675b1a1086C1bF0CCf1edA3a05E917", "10000000000000000").send({from : process.env.MY_ADDRESS_USER});
        const burn = await myEthBridgeNew.methods.depositERC20(
            "0xDDF279DE1B9423a0C00dd4A2041Fd48744C0b772",
            "0xDDF279DE1B9423a0C00dd4A2041Fd48744C0b772", 
            "0xC4e2c53664d929e1D7D0AE9fBC848690EF3f81C1",
            "3",
            "80001",
            "10000000000000000").send({from : process.env.MY_ADDRESS_USER});
        console.log(burn);
    } catch (error) { console.log(error); }
}

const withdrawToken = async function () {
    try {
        const burn = await myEthBridge.methods.withdrawERC20(
            "0xDDF279DE1B9423a0C00dd4A2041Fd48744C0b772",
            "0xDDF279DE1B9423a0C00dd4A2041Fd48744C0b772", 
            "0xC4e2c53664d929e1D7D0AE9fBC848690EF3f81C1",
            "3",
            "80001",
            "10000000000000000",
            "0").send({from : process.env.MY_ADDRESS});
        console.log(burn);
    } catch (error) { console.log(error); }
}

const requestToken = async function () {
    try {
        const request = await faucet.methods.requestToken("0xDDF279DE1B9423a0C00dd4A2041Fd48744C0b772", "0xC4e2c53664d929e1D7D0AE9fBC848690EF3f81C1").send({from: process.env.MY_ADDRESS_USER});
        console.log(request);
    } catch (error) { console.log(error); }
}

//getTokenBalance();
//burnToken();
mintToken();
//requestToken();

//depositToken();
//withdrawToken();