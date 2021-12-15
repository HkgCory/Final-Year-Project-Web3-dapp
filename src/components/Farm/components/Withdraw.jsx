import { Button, Card, Input, Typography, Form, notification } from "antd";
import { useMemo, useState, useRef } from "react";
import MasterInfo from "contracts/MasterFUJI.json";
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import config from "contracts/config"
import BigNumber from "bignumber.js";
const { Text } = Typography;

export default function Deposit() {

  const { Moralis, web3 } = useMoralis();
  const { chainId, walletAddress } = useMoralisDapp();

  //MasterChef
  const Masterabi = MasterInfo;
  const masterChefAddress = config.FUJI.MasterChef
  const MasterContract = new web3.eth.Contract(Masterabi, masterChefAddress);

  const [balance, setBalance] = useState(0)
  const [participate, setParticipate] = useState(null);
  const [wval, setWval] = useState(0);
  const [reward=new BigNumber,setReward] = useState(0);
const pid=config.FUJI.pid

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
    let key = BigNumber(value * config.decimals)
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

  function Withdraw(value) {
    let key = BigNumber(value * config.decimals)
    MasterContract.methods
      .withdraw(pid, key)
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
  }

  function Participate() {
    // ----------------------------------------------------------------
    // Read function
    MasterContract.methods.userInfo(pid, walletAddress).call(function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      console.log("Staked: ", res)
      if (res.amount != 0) {
        setParticipate(true);
        setBalance(res.amount/config.decimals);
      } else {
        setParticipate(false);
      }
    })
    if (participate){
    setInterval(function(){ 
    MasterContract.methods.pendingFYP(pid, walletAddress).call(function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Reward is: ", res)

            setReward(res/config.decimals)
            
      })
     },8000)}
  };

  return (
    <>

<Button type="submit" onClick={() => Participate()}>
        Chcek your participate
      </Button>{participate == null ?"":
participate == false ?
<>
<p>
  <Text>Please deposit frsit</Text>
</p>

</>
          :
          <>
            <Button type="submit" onClick={() => Withdraw(wval)}>
              Withdraw
            </Button>
            <Input type='type' id="mytext1" onChange={e => setWval(e.target.value)} placeholder="0" allowClear value={wval} 
            suffix={
                <Button type="type" onClick={() => setWval(balance)} align="center" size="small" >Withdraw MAX LP</Button>
            }
            />
            <span>            
                Reward Earned  {reward} FYP
                <Button type="submit" onClick={() => Deposit(0)}>
              Harvest
            </Button></span>
            <Form.Item style={{ marginBottom: "5px" }}>Blanace on the pool : {balance} LP
            </Form.Item> 
          </>
      }



    </>

  );
}
