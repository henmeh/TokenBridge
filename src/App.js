import React from "react";
// Style
import { GlobalStyle } from "./GlobalStyle";
// Components
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
// Views
import Home from "./views/home";
// Hook
import { useLogInState } from "./hooks/useLogInState";

import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 70px 1fr 10px;
  min-height: 97vh;
`;

const App = () => {
  //the state concering the user is logged in or not will be set in the parent component of navbar and body. So they both share the same state in terms of user loggin
  const { state: user, LogIn, LogOut } = useLogInState();

  return (
    <Wrapper>
      <Header user={user} LogOut={LogOut} />
      <Home user={user} LogIn={LogIn} />
      <Footer />
      <GlobalStyle />
    </Wrapper>
  );
};

export default App;
