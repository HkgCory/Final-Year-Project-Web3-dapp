import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import "./index.css";
import QuickStart from "components/QuickStart";
import { MoralisDappProvider } from "./providers/MoralisDappProvider/MoralisDappProvider";
import Moralis from "moralis";

  const APP_ID = process.env.REACT_APP_MORALIS_APPLICATION_ID;
  const SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL
  // const {Moralis}=useMoralis();
  // const OrdersList = Moralis.Object.extend('OrdersList')
  // REACT_APP_MORALIS_APPLICATION_IDrop = "Y2Kld0NV5bZiYH2XUXGcUvHsNxbQxSOL2xS30xSt"
  // REACT_APP_MORALIS_SERVER_URLrop = "https://6hsumcginxpf.moralishost.com:2053/server"
  // REACT_APP_MORALIS_SERVER_URL = "https://gew6prtulvqa.usemoralis.com:2053/server"
  // REACT_APP_MORALIS_APPLICATION_ID = "ZtSLmE9ecWCPhbSioWKRlItD4357UrvLlSM3juVC"
  
  const serverUrl ="https://6hsumcginxpf.moralishost.com:2053/server"
  const appId="Y2Kld0NV5bZiYH2XUXGcUvHsNxbQxSOL2xS30xSt"


  Moralis.start({serverUrl,appId});
const Application = () => {
  if (APP_ID && SERVER_URL)
    return (
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <MoralisDappProvider>
          <App />
        </MoralisDappProvider>
      </MoralisProvider>
    );
  else {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <QuickStart />
      </div>
    );
  }
};

/** Get your free Moralis Account https://moralis.io/ */
ReactDOM.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>,
  document.getElementById("root")
);
