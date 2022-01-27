require("dotenv").config();
const Moralis = require("moralis");
const { BTTonETH, WBNBonETH, WMATIConETH, WBTTonBSC, WETHonBSC, WMATIConBSC, WBTTonPolygon, WETHonPolygon, WBNBonPolygon } = require("./tokenAddresses");
const { bridgeEth, bridgeBsc, bridgePolygon, faucet } = require("./bridgeAddresses");
const { bridgeABI, erc20ABI } = require("./contractABI");
const { privateKey } = require("../key");
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3'); 

Moralis.initialize(process.env.MORALIS_API);
Moralis.serverURL = process.env.MORALIS_URL;

//Moralis.start({ serverUrl: process.env.MORALIS_URL, appId: process.env.MORALIS_API }); 

async function init() {
  window.web3 = await Moralis.Web3.enable();
}

init();

export const Login = async () => {
  try {
    const user = await Moralis.authenticate();
    return user;
  } catch (error) {
    console.log(error);
  }
}

export const Logout = async () => {
  try {
    await Moralis.User.logOut();
    return false;
  } catch (error) {
    console.log(error);
  }
}

  export const getMyBalances =  async (user) => {
    try {
      console.log("get my balances");
      const _userAddress = user.attributes.ethAddress;
      const chains = ["ropsten", "bsc testnet", "mumbai"];
      const chainId = ["3", "97", "80001"];
      const chainImage = ["https://tokens.1inch.exchange/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png", "https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c.png", "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912"];
      const nativeName = ["Ether", "Binance Coin", "Matic"];
      const nativeSymbol = ["Eth", "BNB", "Matic"];
      const tokenAddresses = [[BTTonETH, WBNBonETH, WMATIConETH], [WBTTonBSC, WETHonBSC, WMATIConBSC], [WBTTonPolygon, WETHonPolygon, WBNBonPolygon]]; 
      let balances = [];

      for(let i = 0; i < chains.length; i++) {
        let balance;
        //get native Balance
        const options = { chain: chains[i], address: _userAddress };
        balance = await Moralis.Web3API.account.getNativeBalance(options);
        const token = {
          name: nativeName[i],
          symbol: nativeSymbol[i],
          balance: balance.balance,
          decimals: "18",
          tokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          chain: chainImage[i],
          chainName: chains[i],
          chainId: chainId[i],
          balanceStatus: "confirmed",
        };
        balances.push(token);

        // get token balance
        for(let j = 0; j < tokenAddresses[i].length; j++) {
          const options = { chain: chains[i], address: _userAddress }
          const tokenBalances = await Moralis.Web3API.account.getTokenBalances(options);
          for(let token of tokenBalances) {
            if(tokenAddresses[i][j].toLowerCase() === token.token_address) {
              const myToken = {
                name: token.name,
                symbol: token.symbol,
                balance: token.balance,
                decimals: token.decimals,
                tokenAddress: token.token_address,
                chain: chainImage[i],
                chainName: chains[i],
                chainId: chainId[i],
                balanceStatus: "confirmed"
              };
              balances.push(myToken);
            }
          }
        }
      }
      return balances;      
    } catch (error) {
      console.log(error);
    }
  }

  export const getFaucetBalance = async () => {
    try {
      console.log("faucet balance");
      const options = { chain: 'ropsten', address: faucet }
      const balances = await Moralis.Web3API.account.getTokenBalances(options);
      return balances[0]["balance"];
    } catch (error) { console.log(error); }
  }

  export const requestBTT = async () => {
    try {
      let user = Moralis.User.current();
      const _userAddress = user.attributes.ethAddress;
      const params = { tokenAddress: BTTonETH, address: _userAddress };
      const request = await Moralis.Cloud.run("requestToken", params);
      console.log(request);
      alert("Request successfull Tokenbalance will be updated as soon as TX is confirmed");
    } catch (error) { alert(error); }
  }

  export const bridgeToken = async (fromTokenAddress, fromChain, toChain, amount, tokenDecimals) => {    
    const chainIds = [3, 97, 80001];
    const bridgeAddresses = {3: bridgeEth, 97: bridgeBsc, 80001: bridgePolygon};
    const fromTokenAddresses = {
        3: ["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase(), BTTonETH, WBNBonETH, WMATIConETH],
        97: [WETHonBSC, WBTTonBSC, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase(), WMATIConBSC],
        80001: [WETHonPolygon, WBTTonPolygon, WBNBonPolygon, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase(),],
    }
    const toTokenAddresses = {
      0: ["0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase(), WETHonBSC, WETHonPolygon],
      1: [BTTonETH, WBTTonBSC, WBTTonPolygon],
      2: [WBNBonETH, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase(), WBNBonPolygon],
      3: [WMATIConETH, WMATIConBSC, "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()],
    }
    const fromTokenAddressIndex = fromTokenAddresses[fromChain].indexOf(fromTokenAddress);
    const toTokenAddress = toTokenAddresses[fromTokenAddressIndex][chainIds.indexOf(toChain)];
    const bridgeAmount = (parseFloat(amount) * Math.pow(10, tokenDecimals)).toString();
        
    try {
      let user = Moralis.User.current();
      const _userAddress = user.attributes.ethAddress;
      const networkCheck = await _networkCheck(fromChain);
      if(networkCheck) {
      //Bridging native currency
      if(fromTokenAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()) {
        const bridgeContract = new window.web3.eth.Contract(bridgeABI, bridgeAddresses[fromChain]);
        const depositEth = await bridgeContract.methods.depositEth(
            fromTokenAddress,
            toTokenAddress, 
            _userAddress,
            fromChain.toString(),
            toChain.toString(),
            bridgeAmount).send({from : _userAddress, value: bridgeAmount});
        console.log(depositEth);
      }
      //Bridging ERC20Token
      else {
        //appprove Bridgecontract to handle token
        const erc20Contract = new window.web3.eth.Contract(erc20ABI, fromTokenAddress);
        const approve = await erc20Contract.methods.approve(bridgeAddresses[fromChain], bridgeAmount).send({from : _userAddress});
        console.log(approve);
        //bridge ERC20Token
        const bridgeContract = new window.web3.eth.Contract(bridgeABI, bridgeAddresses[fromChain]);
        if(fromChain === 3 && fromTokenAddress ===  BTTonETH) {
          const burn = await bridgeContract.methods.depositERC20(
            fromTokenAddress,
            toTokenAddress, 
            _userAddress,
            fromChain.toString(),
            toChain.toString(),
            bridgeAmount).send({from : _userAddress});
        console.log(burn);
        }
        else {
          const burn = await bridgeContract.methods.burn(
            fromTokenAddress,
            toTokenAddress, 
            _userAddress,
            fromChain.toString(),
            toChain.toString(),
            bridgeAmount).send({from : _userAddress});
        console.log(burn);
        }
      }
    }
    } catch (error) { console.log(error); }
  }

  export const getMyTransactions = async (chain) => {
    try {
      let user = Moralis.User.current();
      const _userAddress = user.attributes.ethAddress;
      const mappedTokens = [bridgeEth, bridgeBsc, bridgePolygon, BTTonETH, WBNBonETH, WMATIConETH, WBTTonBSC, WETHonBSC, WMATIConBSC, WBTTonPolygon, WETHonPolygon, WBNBonPolygon];
      let queryTx;
      let queryTransfers;
      let provider;
      if(chain === 3) {
        queryTx = new Moralis.Query("EthTransactions");
        queryTransfers = new Moralis.Query("EthTokenTransfers");
        provider = process.env.SpeedyNodeETH;
      }
      else if(chain === 97) {
        queryTx = new Moralis.Query("BscTransactions");
        queryTransfers = new Moralis.Query("BscTokenTransfers");
        provider = process.env.SpeedyNodeBSC;
      }
      else if(chain === 80001) {
        queryTx = new Moralis.Query("PolygonTransactions");
        queryTransfers = new Moralis.Query("PolygonTokenTransfers");
        provider = process.env.SpeedyNodePolygon;
      }
      queryTx.containedIn("from_address", ["0xc241796aE04fAf043a9e5C163D237c6966e5448d".toLowerCase(), _userAddress]);
      queryTx.containedIn("to_address", mappedTokens);
      queryTx.descending("block_number");
      queryTx.limit(10);
	    const transactions = await queryTx.find();
  	
  	  let responseTransactions = [];
  
  	  for(let i = 0; i < transactions.length; ++i) {
      	queryTransfers.equalTo("transaction_hash", transactions[i].get("hash"));
      	const tokenTransferResult = await queryTransfers.first();    
      	if(tokenTransferResult){
          const web3 = new Web3(new HDWalletProvider(privateKey, provider));
          const contract = new web3.eth.Contract(erc20ABI, tokenTransferResult.get("token_address"));
          const symbol = await contract.methods.symbol().call();
          const decimals = await contract.methods.decimals().call();
          const tx = {
              hash: transactions[i].get("hash"),
              method: transactions[i].get("input"),
              toAddress: transactions[i].get("to_address"),
              value: transactions[i].get("value"),
              tokenAmount: tokenTransferResult.get("value"),
              tokenSymbol: symbol,
              tokenDecimals: decimals,
              status: transactions[i].get("confirmed"),
              date: transactions[i].get("createdAt"),
            }
            responseTransactions.push(tx);
        } else {
          	const tx = {
              hash: transactions[i].get("hash"),
              method: transactions[i].get("input"),
              toAddress: transactions[i].get("to_address"),
              value: transactions[i].get("value"),
              tokenAmount: false,
              tokenSymbol: false,
              tokenDecimals: "18",
              status: transactions[i].get("confirmed"),
              date: transactions[i].get("createdAt"),
            }
            responseTransactions.push(tx);
        }
    }

      let methode;
      for (var i = 0; i < responseTransactions.length; i++) {
        if (
          responseTransactions[i]["method"].substring(0, 10) ===
          window.web3.eth.abi.encodeFunctionSignature(
            {
              "inputs": [
                {
                  "internalType": "address",
                  "name": "fromTokenAddress",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "toTokenAddress",
                  "type": "address"
                },
                {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "internalType": "uint256",
                  "name": "fromChain",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "toChain",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "depositERC20",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            }
          )
        ) {
          methode = "Deposit ERC20";
        } else if (
          responseTransactions[i]["method"].substring(0, 10) ===
          window.web3.eth.abi.encodeFunctionSignature({
            "inputs": [
              {
                "internalType": "address",
                "name": "fromTokenAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "toTokenAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "fromChain",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "toChain",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "depositEth",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          })
        ) {
          methode = "Deposit Eth";
        } else if (
          responseTransactions[i]["method"].substring(0, 10) ===  window.web3.eth.abi.encodeFunctionSignature({
            "inputs": [
              {
                "internalType": "address",
                "name": "fromTokenAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "toTokenAddress",
                "type": "address"
              },
              {
                "internalType": "address payable",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "fromChain",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "toChain",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "otherChainNonce",
                "type": "uint256"
              }
            ],
            "name": "withdrawEth",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          })
        ) {
          methode = "Withdraw Eth";
        } else if (
          responseTransactions[i]["method"].substring(0, 10) ===  window.web3.eth.abi.encodeFunctionSignature({
            "inputs": [
              {
                "internalType": "address",
                "name": "fromTokenAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "toTokenAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "fromChain",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "toChain",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "otherChainNonce",
                "type": "uint256"
              }
            ],
            "name": "withdrawERC20",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          })
        ) {
          methode = "Withdraw ERC20";
        } else if (
          responseTransactions[i]["method"].substring(0, 10) ===  window.web3.eth.abi.encodeFunctionSignature({
            "inputs": [
              {
                "internalType": "address",
                "name": "fromTokenAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "toTokenAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "fromChain",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "toChain",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              }
            ],
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          })
        ) {
          methode = "Burn";
        } else if (
          responseTransactions[i]["method"].substring(0, 10) ===  window.web3.eth.abi.encodeFunctionSignature({
            "inputs": [
              {
                "internalType": "address",
                "name": "fromTokenAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "toTokenAddress",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "owner",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "fromChain",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "toChain",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "otherChainNonce",
                "type": "uint256"
              }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
          })
        ) {
          methode = "Mint";
        }else if (
          responseTransactions[i]["method"].substring(0, 10) === "0x095ea7b3"
        ) {
          methode = "Approve";
        } else {
          methode = responseTransactions[i]["method"].substring(0, 10);
        }
        responseTransactions[i]["method"] = methode;
      }
      return responseTransactions;
    } catch (error) {
      console.log(error);
    }
  }

const _networkCheck = async (_networkId) => {
  let network = await Moralis.getChainId();  
  if (network !== _networkId) {
    await Moralis.switchNetwork(_networkId);
    return true;
  }
  else {
    return true;
  }
}