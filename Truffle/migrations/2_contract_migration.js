const MyTokenBTT = artifacts.require("MyToken");
const MyTokenWBNB = artifacts.require("MyToken");
const MyTokenWMATIC = artifacts.require("MyToken");
const MyTokenWBTT = artifacts.require("MyToken");
const MyTokenWETH = artifacts.require("MyToken");
const Bridge = artifacts.require("Bridge");
const Faucet = artifacts.require("Faucet");

module.exports = async function (deployer, network, addresses) {
  if(network === "ropsten") {
    console.log("Deploy faucet");
    await deployer.deploy(Faucet);
    const faucet = await Faucet.deployed();
    console.log("Deploy BTT");
    await deployer.deploy(MyTokenBTT, "BridgingTestToken", "BTT");
    const tokenBTT = await MyTokenBTT.deployed();
    console.log("minting");
    await tokenBTT.mint(addresses[0], "100000000000000000000000");
    console.log("approve");
    await tokenBTT.approve(faucet.address, "100000000000000000000000");
    console.log("transfer");
    await tokenBTT.transfer(faucet.address, "100000000000000000000000");
    console.log("Deploy WBNB");
    await deployer.deploy(MyTokenWBNB, "WrappedBNB", "WBNB");
    const tokenWBNB = await MyTokenWBNB.deployed();
    console.log("Deploy WMATIC"); 
    await deployer.deploy(MyTokenWMATIC, "WrappedMatic", "WMATIC");  
    const tokenWMATIC = await MyTokenWMATIC.deployed();
    console.log("Deploy BridgeEth");
    await deployer.deploy(Bridge);
    const bridge = await Bridge.deployed();
    //setting the address of bridgeEth as Admin to mint tokens
    //for BTT Token on Eth the Admin will be my deploying address
    tokenWBNB.updateAdmin(bridge.address);
    tokenWMATIC.updateAdmin(bridge.address);
  }

  if(network === "bscTestnet") {
    console.log("Deploy WBTT");
    await deployer.deploy(MyTokenWBTT, "WrappedBridgingTestToken", "WBTT");
    const tokenWBTT = await MyTokenWBTT.deployed();
    console.log("Deploy WETH");
    await deployer.deploy(MyTokenWETH, "WrappedEth", "WETH");
    const tokenWETH = await MyTokenWETH.deployed();
    console.log("Deploy WMATIC");
    await deployer.deploy(MyTokenWMATIC, "WrappedMatic", "WMATIC");
    const tokenWMATIC = await MyTokenWMATIC.deployed();
    console.log("Deploy BridgeBsc");
    await deployer.deploy(Bridge);
    const bridge = await Bridge.deployed();
    //setting the address of bridgeEth as Admin to mint tokens
    tokenWETH.updateAdmin(bridge.address);
    tokenWMATIC.updateAdmin(bridge.address);
    tokenWBTT.updateAdmin(bridge.address);        
  }

  if(network === "polygonTestnet") {
    console.log("Deploy WBTT");
    await deployer.deploy(MyTokenWBTT, "WrappedBridgingTestToken", "WBTT");
    const tokenWBTT = await MyTokenWBTT.deployed();
    console.log("Deploy WETH");
    await deployer.deploy(MyTokenWETH, "WrappedEth", "WETH");
    const tokenWETH = await MyTokenWETH.deployed();
    console.log("Deploy WBNB");
    await deployer.deploy(MyTokenWBNB, "WrappedBNB", "WBNB");
    const tokenWBNB = await MyTokenWBNB.deployed();
    console.log("Deploy BridgePolygon");
    await deployer.deploy(Bridge);
    const bridge = await Bridge.deployed();
    //setting the address of bridgeEth as Admin to mint tokens
    tokenWETH.updateAdmin(bridge.address);
    tokenWBNB.updateAdmin(bridge.address);
    tokenWBTT.updateAdmin(bridge.address);    
  }
};
