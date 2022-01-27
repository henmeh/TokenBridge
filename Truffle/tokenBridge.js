require('dotenv').config();
const Moralis = require('moralis/node');
const bridgeAddresses = require('./bridgeAddresses.json');
const BTTonETH = "0x2dF35c694855133B0f63c1F1a22802A4639b340B".toLowerCase();
// connect to Moralis server
Moralis.initialize(process.env.MORALIS_API);
Moralis.serverURL = process.env.MORALIS_URL;

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const bridgeABI = require("./build/contracts/Bridge.json");


// Connecting to the Ethereum Blockchain 
const web3Eth = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, proecess.env.SpeedyNodeETH));
// Connecting to the BSC Blockchain 
const web3BSC = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, proecess.env.SpeedyNodeBSC));
// Connecting to the Polygon Blockchain 
const web3Polygon = new Web3(new HDWalletProvider(process.env.PRIVATE_KEY, proecess.env.SpeedyNodePolygon));
// Connecting to Bridge on Eth
const myEthBridge = new web3Eth.eth.Contract(bridgeABI.abi, bridgeAddresses.bridgeEth);
// Connecting to Bridge on BSC
const myBSCBridge = new web3BSC.eth.Contract(bridgeABI.abi, bridgeAddresses.bridgeBsc);
// Connecting to Bridge on Polygon
const myPolygonBridge = new web3Polygon.eth.Contract(bridgeABI.abi, bridgeAddresses.bridgePolygon);

const bridgeToken = async () => {
    const queryEth = new Moralis.Query("TransferOnEth");
    const subscriptionEth = await queryEth.subscribe();

    const queryBsc = new Moralis.Query("TransferOnBsc");
    const subscriptionBsc = await queryBsc.subscribe();

    const queryPolygon = new Moralis.Query("TransferOnPolygon");
    const subscriptionPolygon = await queryPolygon.subscribe();

    subscriptionEth.on("create", async function(data) {
        console.log("New Transfer on Eth");
        // check if step is burn only then a mint action is needed
        if(data.attributes.step === "burn") {
            if(data.attributes.toChain === "97") {
                try {
                    if(data.attributes.toTokenAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()) {
                        const mint = await myBSCBridge.methods.withdrawEth(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                        console.log(mint);
                    }
                    else { 
                        const mint = await myBSCBridge.methods.mint(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                    console.log(mint);
                    }
                } catch (error) { console.log(error); }
            }
            if(data.attributes.toChain === "80001") {
                try {
                    if(data.attributes.toTokenAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()) {
                        const mint = await myPolygonBridge.methods.withdrawEth(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                        console.log(mint);
                    }
                    else { 
                        const mint = await myPolygonBridge.methods.mint(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                    console.log(mint);
                    }
                } catch (error) { console.log(error); }
            }
        }
    });

    subscriptionBsc.on("create", async function(data) {
        console.log("New Transfer on Bsc");
        // check if step is burn only then a mint action is needed
        if(data.attributes.step === "burn") {
            if(data.attributes.toChain === "3") {
                try {
                    if(data.attributes.toTokenAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()) {
                        const mint = await myEthBridge.methods.withdrawEth(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                        console.log(mint);
                    }
                    else if (data.attributes.toTokenAddress === BTTonETH) {
                        const mint = await myEthBridge.methods.withdrawERC20(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                        console.log(mint);
                    }
                    else { 
                        const mint = await myEthBridge.methods.mint(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                    console.log(mint);
                    }
                } catch (error) { console.log(error); }
            }
            if(data.attributes.toChain === "80001") {
                try {
                    if(data.attributes.toTokenAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()) {
                        const mint = await myPolygonBridge.methods.withdrawEth(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                        console.log(mint);
                    }
                    else { 
                        const mint = await myPolygonBridge.methods.mint(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                    console.log(mint);
                    }
                } catch (error) { console.log(error); }
            }
        }
    });

    subscriptionPolygon.on("create", async function(data) {
        console.log("New Transfer Polygon");
        // check if step is burn only then a mint action is needed
        if(data.attributes.step === "burn") {
            if(data.attributes.toChain === "3") {
                try {
                    if(data.attributes.toTokenAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()) {
                        const mint = await myEthBridge.methods.withdrawEth(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                        console.log(mint);
                    }
                    else if (data.attributes.toTokenAddress === BTTonETH) {
                        const mint = await myEthBridge.methods.withdrawERC20(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                        console.log(mint);
                    }
                    else { 
                        const mint = await myEthBridge.methods.mint(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                    console.log(mint);
                    }
                } catch (error) { console.log(error); }
            }
            if(data.attributes.toChain === "97") {
                try {
                    if(data.attributes.toTokenAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()) {
                        const mint = await myBSCBridge.methods.withdrawEth(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                        console.log(mint);
                    }
                    else { 
                        const mint = await myBSCBridge.methods.mint(
                            data.attributes.fromTokenAddress,
                            data.attributes.toTokenAddress, 
                            data.attributes.owner,
                            data.attributes.fromChain,
                            data.attributes.toChain,
                            data.attributes.amount,
                            data.attributes.nonce).send({from : process.env.MY_ADDRESS});
                    console.log(mint);
                    }
                } catch (error) { console.log(error); }
            }
        }
    });
}

bridgeToken();
