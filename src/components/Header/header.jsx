import React from "react";
// Styling
import { Wrapper } from "./Header.styles";
// Button
import NormalButton from "../Button/NormalButton/button";

const Header = ({ user, LogOut }) => {
  return (
    <Wrapper>
      <h1>MoralisBridge</h1>
      <div>
        {user ? `Logged in with: ${user.attributes.ethAddress}` : null}
        {user ? <NormalButton
          text={"LogOut"}
          onClick={LogOut}
          fontSize={"1.2rem"}
        /> : null}
      </div>
    </Wrapper>
  );
};

export default Header;
