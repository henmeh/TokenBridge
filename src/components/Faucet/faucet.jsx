import React, { useState, useEffect } from "react";
//Components
import NormalButton from "../Button/NormalButton/button";
// Functions
import { requestBTT, getFaucetBalance } from "../../functions/functions";
// Styling
import { Wrapper } from "./faucet.styles";
// Moralis
import moralis from "moralis";
// Address
import { faucet } from "../../functions/bridgeAddresses";

//Testnet
moralis.initialize(process.env.REACT_APP_MORALIS_API);
moralis.serverURL = process.env.REACT_APP_MORALIS_URL;

const Faucet = () => {
  const [balance, setFaucetBalance] = useState(false);

  const requestToken = async () => {
    await requestBTT();
  };

  const componentDidMount = async () => {
    let faucetbalance = await getFaucetBalance();
    setFaucetBalance(faucetbalance);
    let queryEthTokenBalance = new moralis.Query("EthTokenBalance");
    let subscriptionEthTokenBalance = await queryEthTokenBalance.subscribe();
    let queryEthTokenBalancePending = new moralis.Query("EthTokenBalancePending");
    let subscriptionEthTokenBalancePending = await queryEthTokenBalancePending.subscribe();

    subscriptionEthTokenBalance.on("create", async (object) => {
      if(object.attributes.address === faucet) {
        await onUpdate();
      }
    });
    subscriptionEthTokenBalance.on("update", async (object) => {
      if(object.attributes.address === faucet) {
        await onUpdate();
      }
    });
    subscriptionEthTokenBalancePending.on("create", async (object) => {
      if(object.attributes.address === faucet) {
        await onUpdate();
      }
    });
    subscriptionEthTokenBalancePending.on("update", async (object) => {
      if(object.attributes.address === faucet) {
        await onUpdate();
      }
    });
  };

  const onUpdate = async () => {
    let faucetbalance = await getFaucetBalance();
    setFaucetBalance(faucetbalance);
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <Wrapper>
      <NormalButton
        text={"Request Token"}
        onClick={requestToken}
        fontSize={"0.8rem"}
      />
      <h3>
        {"BTT Faucetbalance: " +
          parseInt(balance / 1000000000000000000).toString()}
      </h3>
    </Wrapper>
  );
};

export default Faucet;
