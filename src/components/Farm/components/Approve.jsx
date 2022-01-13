import { Button, Card, Input, Typography, Form, notification } from "antd";
import { useMemo, useState ,useRef} from "react";
import LPInfo from "contracts/PairFUJI.json";
import MasterInfo from "contracts/MasterFUJI.json";
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import config from "contracts/config"

import BigNumber from "bignumber.js";
const { Text } = Typography;

export default function Approve() {

  const { Moralis, web3 } = useMoralis();
  const { chainId, walletAddress } = useMoralisDapp();
  // const approveValue = config.approve
  let approveValue =web3.utils.toWei('100000000000000000')
//Pair
  const LPabi = LPInfo;
  const LPAddress = config.FUJI.LPInfo
  const LPContract = new web3.eth.Contract(LPabi, LPAddress);
//MasterChef
  const Masterabi = MasterInfo;
  const masterChefAddress = config.FUJI.MasterChef
  const MasterContract = new web3.eth.Contract(Masterabi, masterChefAddress);
  const pid = config.FUJI.pid;

  const [balance, setBalance] = useState(0)
  const [right, setRight] = useState(null);
  const [dval,setDval]= useState(0);

  const openNotification = ({ message, description }) => {
    notification.open({
      placement: "bottomRight",
      message,
      description,
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };

  function Deposit(value) {
    //write contract
    // setDval(document.querySelector('input').value) 
    let key= web3.utils.toWei(value);
    // let key=BigNumber(value *config.decimals)
    MasterContract.methods
      .deposit(pid, key)
      .send({ from: walletAddress }, function (err, res) {
        if (err) {
          openNotification({
            message: "transfer failled",
            description: `📃 Tx Hash: ${err}`,
          });
          console.log("An error occured", err)
          return
        }
        openNotification({
          message: "🔊 New Transaction",
          description: `📃 Tx Hash: ${res}`,
        });
        console.log("Hash of the transaction: " + res)
      })
  };

  function Approval() {
    //write contract
    LPContract.methods
      .approve(masterChefAddress, approveValue)
      .send({ from: walletAddress }, function (err, res) {
        if (err) {
          openNotification({
            message: "transfer failled",
            description: `📃 Tx Hash: ${err}`,
          });
          console.log("An error occured", err)
          return
        }
        openNotification({
          message: "🔊 New Transaction",
          description: `📃 Tx Hash: ${res}`,
          // onClick: () => window.open("https://www.google.com/" ,"_blank")
        });
        console.log("Hash of the transaction: " + res)
      })
  };

  function Right() {
    // ----------------------------------------------------------------
    // Read function
    LPContract.methods.allowance(walletAddress, masterChefAddress).call(function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      console.log("The allowance is: ", res)
      if (res == approveValue) {
        setRight(true);
      } else {
        setRight(false);
      }
    })

    LPContract.methods.balanceOf(walletAddress).call(function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      console.log("The balances are: ", res);
      // let key =BigNumber(res/config.decimals)
      setBalance(res/config.decimals)

    })
      //
  };

  return (
    <>
      <Button type="submit" onClick={() => Right()}>
        Check Your Approval
      </Button>{right == null ? "" :
        right == false ?
          <Button type="submit" onClick={() => Approval()} >
            Approve
          </Button>
          :
          <>
          <Button type="submit" onClick={() => Deposit(dval)}>
           Deposit
          </Button>
          <Input type='type' id="mytext1" onChange={e => setDval(e.target.value)}  placeholder="0" allowClear value={dval} 
          suffix={
            <Button type="type" onClick={() => setDval(balance)} align="center" size="small" >Deposit Max FYP-AVAX LP</Button>
          } />

        </>
      }
            <Form.Item style={{ marginBottom: "5px" }}>Balance In Your Wallet : {balance} LP

            </Form.Item>
    </>

  );
}
