import React, { useState } from "react";
// Styles
import { Wrapper } from "./Balance.style";
import PropTypes from "prop-types";
// Components
import Image from "../Image/image";
import Button from "../Button/NormalButton/button";
// Functions
import { bridgeToken } from "../../functions/functions";

const formatBalance = (balance, decimals) => (balance / Math.pow(10, decimals)).toFixed(8);

const Balance = ({ name, symbol, balance, decimals, chain, tokenAddress, chainId }) => {
  const [amount, setAmount] = useState();
  
  const bridgeTokens = async (toChain) => {
    !amount ? alert("Please insert an amount") : await bridgeToken(tokenAddress, chainId, toChain, amount, decimals);
  }
  
  return (
    <Wrapper>
        <td>{name}</td>
        <td>{symbol}</td>
        <td>{formatBalance(balance, decimals)}</td>
        <td>
          <Image image={chain} alt="ChainLogo" height={25} />
        </td>
        <td>
        {chainId === 3 ? <div className="bridgingColumn"><input type="number" placeholder="Input Amount" onChange={((event) => setAmount(event.target.value))}/><Button text={"Bridge to Bsc"} fontSize={"0.75rem"} onClick={() => bridgeTokens(97)}/>  <Button text={"Bridge to Polygon"} fontSize={"0.75rem"} onClick={() => bridgeTokens(80001)}/> </div> : 
        chainId === 97 ? <div className="bridgingColumn"><input type="number" placeholder="Input Amount" onChange={((event) => setAmount(event.target.value))}/><Button text={"Bridge to Eth"} fontSize={"0.75rem"} onClick={() => bridgeTokens(3)}/>  <Button text={"Bridge to Polygon"} fontSize={"0.75rem"} onClick={() => bridgeTokens(80001)}/> </div> :
                           <div className="bridgingColumn"><input type="number" placeholder="Input Amount" onChange={((event) => setAmount(event.target.value))}/><Button text={"Bridge to Eth"} fontSize={"0.75rem"} onClick={() => bridgeTokens(3)}/>  <Button text={"Bridge to Bsc"} fontSize={"0.75rem"} onClick={() => bridgeTokens(97)}/> </div>}
        </td>
    </Wrapper>
  );
}

Balance.propTypes = {
  symbol: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  decimals: PropTypes.number.isRequired,
};

export default Balance;
