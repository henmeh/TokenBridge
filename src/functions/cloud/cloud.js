Moralis.Cloud.define("requestToken", async (request) => {
  const faucetAddress = "0xf3921A014cA6e93A073c590D09369fAf49EC843f";
  const faucetABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "tokenReceiver",
          "type": "address"
        }
      ],
      "name": "requestToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  const web3 = Moralis.web3ByChain("0x3");
  const faucet = new web3.eth.Contract(faucetABI, faucetAddress);
  const data = faucet.methods.requestToken(request.params.tokenAddress, request.params.address);
    const gas = await data.estimateGas({from: "0xc241796aE04fAf043a9e5C163D237c6966e5448d"});
    const gasPrice = await web3.eth.getGasPrice();
    const txNonce = await web3.eth.getTransactionCount("0xc241796aE04fAf043a9e5C163D237c6966e5448d");
    const txData = data.encodeABI();
    const config = await Moralis.Config.get({useMasterKey: true});
    const privateKey = config.get("privateKey");
  
    tx = {
      to: faucetAddress,
      data: txData,
      gas: gas,
      gasPrice: gasPrice,
      nonce: txNonce,
      chainId: "3",
    };
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const response = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return response;
});

const doBridging = async (
  fromTokenAddress,
  toTokenAddress,
  owner,
  fromChain,
  toChain,
  amount,
  nonce
) => {
  const bridgeAddresses = {
    "3": "0xC1c4A0d273f0b1995f55EDb512fe4f8ae79A67Ef",
    "97": "0x2A0B006529395BDC0AA6C8691E83B1d8738FDf2c",
    "80001": "0xDD139bC431D95d343bebaBC9B6CF2db40F49DdC1",
  };
  const chains = {
    "3": "0x3",
    "97": "0x61",
    "80001": "0x13881",
  };

  const bridgeABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "Received",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "fromTokenAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "toTokenAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fromChain",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "toChain",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "step",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "nonce",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "nonce",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "processedNonces",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "stateMutability": "payable",
      "type": "receive",
      "payable": true
    },
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
    },
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
      "name": "depositEth",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
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
    },
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
    },
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
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
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
    }
  ];

  const web3 = Moralis.web3ByChain(chains[toChain]);
  const myBridge = new web3.eth.Contract(bridgeABI, bridgeAddresses[toChain]);
  let data;

  if (toTokenAddress === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE".toLowerCase()) {
    data = myBridge.methods.withdrawEth(
      fromTokenAddress,
      toTokenAddress,
      owner,
      fromChain,
      toChain,
      amount,
      nonce
    );
  } else if (
    toChain === "3" &&
    toTokenAddress ===
      "0x7d8388de10a89c72769cd9783572Ed332c85e146".toLowerCase()
  ) {
    data = myBridge.methods.withdrawERC20(
      fromTokenAddress,
      toTokenAddress,
      owner,
      fromChain,
      toChain,
      amount,
      nonce
    );
  } else {
    data = myBridge.methods.mint(
      fromTokenAddress,
      toTokenAddress,
      owner,
      fromChain,
      toChain,
      amount,
      nonce
    );
  }
  let config;
  config = await Moralis.Config.get({useMasterKey: true});
  const address = config.get("address");
  const gas = await data.estimateGas({from: address});
  const gasPrice = await web3.eth.getGasPrice();
  const txNonce = await web3.eth.getTransactionCount(address);
  const txData = data.encodeABI();
  config = await Moralis.Config.get({useMasterKey: true});
  const privateKey = config.get("privateKey");

  tx = {
    to: bridgeAddresses[toChain],
    data: txData,
    gas: gas,
    gasPrice: gasPrice,
    nonce: txNonce,
    chainId: toChain,
  };
  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    privateKey
  );
  await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};

Moralis.Cloud.afterSave("TransferOnEth", async (request) => {
    if(request.object.get("confirmed")) {
      if (request.object.get("step") === "burn") {
         await doBridging(
          request.object.get("fromTokenAddress"),
          request.object.get("toTokenAddress"),
          request.object.get("owner"),
          request.object.get("fromChain"),
          request.object.get("toChain"),
          request.object.get("amount"),
          request.object.get("nonce"));
      }
    }
});

Moralis.Cloud.afterSave("TransferOnBsc", async (request) => {
  if(request.object.get("confirmed")) {
    if (request.object.get("step") === "burn") {
      await doBridging(
        request.object.get("fromTokenAddress"),
        request.object.get("toTokenAddress"),
        request.object.get("owner"),
        request.object.get("fromChain"),
        request.object.get("toChain"),
        request.object.get("amount"),
        request.object.get("nonce"));
    }
  }
});

Moralis.Cloud.afterSave("TransferOnPolygon", async (request) => {
  if(request.object.get("confirmed")) {
    if (request.object.get("step") === "burn") {
      await doBridging(
        request.object.get("fromTokenAddress"),
        request.object.get("toTokenAddress"),
        request.object.get("owner"),
        request.object.get("fromChain"),
        request.object.get("toChain"),
        request.object.get("amount"),
        request.object.get("nonce"));
    }
  }
});