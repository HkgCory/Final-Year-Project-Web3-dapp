import { Button, Card, Input, Typography, Form, notification } from "antd";
import Address from "components/Address/Address";
import Approve from "./components/Approve"
import Widthdraw from "./components/Withdraw"
import config from "contracts/config"
import Prices from "./components/Price"
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import Web3 from "web3"
export default function Contract() {


// function AlertIt() {
// var answer = window.confirm("Please click on OK to continue.")
// if (answer){
// console.log(`redireact`)
// // window.open="http://www.google.com";
// console.log(`redireact${account}`)}
// }
// var Accounts = require('web3-eth-accounts');
// var accounts = new Accounts('ws://localhost:8546');
// const web3 = new Web3("https://api.avax-test.network/ext/bc/C/rpc");
// const web3=new Web3
// const provider = new Web3.provider.HttpProvider('http://127.0.0.1:7545')
// const web = new Web3(provider)
// const {active ,account,library,connector ,chainId,activate,deactivate }=useWeb3React()

// activate(chainId)

  return (
    <div style={{ margin: "auto", width: "80vw", minLength: "60vw" }}>
      <Card
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Staking LP and Earn FYP
            <Address avatar="left" copyable address={config.FUJI.LPInfo} size={8} />
          </div>
        }
        size="large"
        style={{ marginTop: 25, width: "100%" }}
      >
        <Form>


          <Card
            title="WETH-FYP PID:1"
            size="small"
            style={{ marginBottom: "20px" }}
          //card name
          >
               <Prices/>

            <Form.Item style={{ marginBottom: "5px" }}>
              <Approve />
            </Form.Item>
            <Form.Item style={{ marginBottom: "5px" }}>
              <Widthdraw />
            </Form.Item>


          </Card>



        </Form>
      </Card>
      {/* <Card>
       
   <Button type="submit" onClick={()=>AlertIt()}>click</Button>
      <span>{`walletAddress: ${account,active,chainId}`}</span>
      </Card> */}

    </div>


  );
}
