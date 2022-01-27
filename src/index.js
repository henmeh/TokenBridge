import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId={process.env.REACT_APP_MORALIS_API}
      serverUrl={process.env.REACT_APP_MORALIS_URL}
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
