import React, { useState, useEffect } from "react";
// Components
import Faucet from "../Faucet/faucet";
// Functions
import { getMyBalances } from "../../functions/functions";
// Styling
import { Wrapper } from "./balanceList.styles";
import Balance from "../Balance/balance";
// Moralis
import moralis from "moralis";
import { bridgeEth, bridgeBsc, bridgePolygon } from "../../functions/bridgeAddresses.js"

//Testnet
moralis.initialize(process.env.REACT_APP_MORALIS_API);
moralis.serverURL = process.env.REACT_APP_MORALIS_URL;

const BalanceList = ({ user }) => {
  const [balanceData, setBalanceData] = useState(false);

  const componentDidMount = async () => {
    let balances = await getMyBalances(user);
    setBalanceData(balances);
    let queryEthBalance = new moralis.Query("EthBalance");
    let subscriptionEthBalance = await queryEthBalance.subscribe();
    let queryPolygonBalance = new moralis.Query("PolygonBalance");
    let subscriptionPolygonBalance = await queryPolygonBalance.subscribe();
    let queryEthTokenBalance = new moralis.Query("EthTokenBalance");
    let subscriptionEthTokenBalance = await queryEthTokenBalance.subscribe();
    let queryPolygonTokenBalance = new moralis.Query("PolygonTokenBalance");
    let subscriptionPolygonTokenBalance = await queryPolygonTokenBalance.subscribe();
    let queryBscBalance = new moralis.Query("BscBalance");
    let subscriptionBscBalance = await queryBscBalance.subscribe();
    let queryBscTokenBalance = new moralis.Query("BscTokenBalance");
    let subscriptionBscTokenBalance = await queryBscTokenBalance.subscribe();

    let queryEthBalancePending = new moralis.Query("EthBalancePending");
    let subscriptionEthBalancePending = await queryEthBalancePending.subscribe();
    let queryPolygonBalancePending = new moralis.Query("PolygonBalancePending");
    let subscriptionPolygonBalancePending = await queryPolygonBalancePending.subscribe();
    let queryEthTokenBalancePending = new moralis.Query("EthTokenBalancePending");
    let subscriptionEthTokenBalancePending = await queryEthTokenBalancePending.subscribe();
    let queryPolygonTokenBalancePending = new moralis.Query("PolygonTokenBalancePending");
    let subscriptionPolygonTokenBalancePending = await queryPolygonTokenBalancePending.subscribe();
    let queryBscBalancePending = new moralis.Query("BscBalancePending");
    let subscriptionBscBalancePending = await queryBscBalancePending.subscribe();
    let queryBscTokenBalancePending = new moralis.Query("BscTokenBalancePending");
    let subscriptionBscTokenBalancePending = await queryBscTokenBalancePending.subscribe();

    subscriptionEthBalance.on("create", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionEthBalance.on("update", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionPolygonBalance.on("create", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionPolygonBalance.on("update", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionEthTokenBalance.on("create", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionEthTokenBalance.on("update", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionPolygonTokenBalance.on("create", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionPolygonTokenBalance.on("update", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionBscTokenBalance.on("create", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionBscTokenBalance.on("update", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionBscBalance.on("create", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionBscBalance.on("update", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });

    subscriptionEthBalancePending.on("create", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress || bridgeEth) {
        await onUpdate();
      }
    });
    subscriptionPolygonBalancePending.on("create", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress || bridgePolygon) {
        await onUpdate();
      }
    });
    subscriptionEthTokenBalancePending.on("create", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionPolygonTokenBalancePending.on("create", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionBscTokenBalancePending.on("create", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionBscBalancePending.on("create", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress || bridgeBsc) {
        await onUpdate();
      }
    });

    subscriptionEthBalancePending.on("delete", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress || bridgeEth) {
        await onUpdate();
      }
    });
    subscriptionPolygonBalancePending.on("delete", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress || bridgePolygon) {
        await onUpdate();
      }
    });
    subscriptionEthTokenBalancePending.on("delete", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionPolygonTokenBalancePending.on("delete", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionBscTokenBalancePending.on("delete", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress) {
        await onUpdate();
      }
    });
    subscriptionBscBalancePending.on("delete", async (object) => {
      if(object.attributes.address === user.attributes.ethAddress || bridgeBsc) {
        await onUpdate();
      }
    });
  }

  const onUpdate = async () => {
      let balances = await getMyBalances(user);
      setBalanceData(balances);
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  if (!balanceData) {
    return <Wrapper>
      
    </Wrapper>
  } else {
  return (
    <>
    <Faucet/>
    <Wrapper>
      <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Ticker</th>
              <th>Balance</th>
              <th>Chain</th>
              <th>Bridge</th>
            </tr>
          </thead>
          <tbody>
            {balanceData.map(
              ({
                balance,
                chain,
                decimals,
                name,
                symbol,
                tokenAddress,
                chainId,
              }) => (
                <Balance
                  key={tokenAddress + chain}
                  balance={parseFloat(balance)}
                  chain={chain}
                  decimals={parseFloat(decimals)}
                  name={name}
                  symbol={symbol}
                  tokenAddress={tokenAddress}
                  chainId={parseInt(chainId)}
                />
              )
            )}
          </tbody>
        </table>
    </Wrapper>
    </>
  );}
};

export default BalanceList;
