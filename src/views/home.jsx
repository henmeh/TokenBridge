import React from "react";
// Styling 
import { Wrapper, Wrapper2 } from './HomeView.styles';
// Components
import BalanceList from "../components/BalanceList/balancelist";
import JobList from "../components/JobList/joblist";
// Button
import NormalButton from "../components/Button/NormalButton/button";
// Video
import Video from "../Video/MoralisBridge.mp4";

const Home = ({ user, LogIn }) => {
  if (user) {
    return (
      <Wrapper>
        <div className="data">
        <div className="item1"><BalanceList user={user} /></div>
        <div className="transactions">
        <JobList chain={3} />
          <JobList chain={97} />
          <JobList chain={80001} />
        </div>
        </div>
      </Wrapper>
    );
  } else {
    return ( 
    <Wrapper2>
      <div className="welcome">
          <video src={Video} width="500" controls></video>
        <h3>Please login with metamask</h3>
        <NormalButton
          text={"LogIn"}
          onClick={LogIn}
          fontSize={"1.2rem"}
        />
      </div>  
    </Wrapper2>);
  }
};

export default Home;