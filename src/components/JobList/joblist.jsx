import React, { useState, useEffect } from "react";
// Components
import Job from "../Job/job";
import Image from "../Image/image";
// Functions
import { getMyTransactions } from "../../functions/functions";
// Styling
import { Wrapper } from "./jobList.styles";
// Moralis
import moralis from "moralis";
// Images
import Ethereum from "../../Images/ethereum.png";
import Polygon from "../../Images/polygon3.png";
import Bsc from "../../Images/bsc.png";

//Testnet
moralis.initialize(process.env.REACT_APP_MORALIS_API);
moralis.serverURL = process.env.REACT_APP_MORALIS_URL;

const JobList = ({ chain }) => {
  const [jobData, setJobData] = useState([]);

  const componentDidMount = async () => {
    let query;
    let subscription;
    let jobs = [];
    if (chain === 3) {
      query = new moralis.Query("EthTransactions");
      subscription = await query.subscribe();
    } else if (chain === 80001) {
      query = new moralis.Query("PolygonTransactions");
      subscription = await query.subscribe();
    } else if (chain === 97) {
      query = new moralis.Query("BscTransactions");
      subscription = await query.subscribe();
    }
    subscription.on("create", async (object) => {
      jobs = await getMyTransactions(chain);
      setJobData(jobs);
    });
    subscription.on("update", async (object) => {
      jobs = await getMyTransactions(chain);
      setJobData(jobs);
    });
    jobs = await getMyTransactions(chain);    
    setJobData(jobs);
  };

  useEffect(() => {
    componentDidMount();
  }, []);

  if (!jobData) {
    return <Wrapper>
      
    </Wrapper>
  } else
   {
    return (
      <Wrapper>
          <table>
            <thead>
              <tr>
                <th><Image image={chain === 3 ? Ethereum : chain === 97 ? Bsc : Polygon} width={25}/> Tx Hash</th>
                <th>Method</th>
                <th>To Address</th>
                <th>
                  {chain === 3 ? "Ether" : chain === 97 ? "BNB" : "Matic"}
                </th>
                <th>Token Amount</th>
                <th>TokenSymbol</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {jobData.map(
                ({
                  hash,
                  method,
                  toAddress,
                  value,
                  tokenAmount,
                  tokenDecimals,
                  tokenSymbol,
                  status,
                  activity,
                  activityId,
                  date,
                }) => (
                  <Job
                    key={hash}
                    hash={hash}
                    method={method}
                    toAddress={toAddress}
                    value={parseInt(value)}
                    tokenAmount={parseInt(tokenAmount)}
                    tokenDecimals={parseInt(tokenDecimals)}
                    tokenSymbol={tokenSymbol}
                    status={status}
                    activity={activity}
                    activityId={activityId}
                    chain={chain}
                    date={date}
                  />
                )
              )}
            </tbody>
          </table>
      </Wrapper>
    );
  }
};

export default JobList;
