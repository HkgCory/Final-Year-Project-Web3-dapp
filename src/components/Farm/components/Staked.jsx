import { Button, Card, Input, Typography, Form, notification } from "antd";
import { useMemo, useState } from "react";
import LPInfo from "contracts/Pair.json";
import Address from "components/Address/Address";
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import config from "contracts/config"
import Deposit   from "./Deposit"
import BigNumber from "bignumber.js";
const { Text } = Typography;


export default function Approve() {

  const { Moralis, web3 } = useMoralis();
  const { chainId, walletAddress } = useMoralisDapp();
  const abi = LPInfo;
  const contractAddress = config.ROP.LPInfo
  const masterChefAddress = config.ROP.MasterChef
  const approveValue = config.approve
  const [balance, setBalance] = useState(0)
  const [right, setRight] = useState(null);

  const contract = new web3.eth.Contract(abi, contractAddress);

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

  function Approval() {
    //write contract
    contract.methods
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
    contract.methods.allowance(walletAddress, masterChefAddress).call(function (err, res) {
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

    contract.methods.balanceOf(walletAddress).call(function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      console.log("The balances are: ", res);
      // let key =BigNumber(res/config.decimals)
      setBalance(res/config.decimals)

    })

  };

function MaxBalance(value) {
 config.MAX=value

}

  // ----------------------------------------------------------------
  // Read function
  // daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  //   if (err) {
  //     console.log("An error occured", err)
  //     return
  //   }
  //   console.log("The balance is: ", res)
  // })


  // -------------------------------------
  //write contract
  // function Value() {
  //   contract.methods
  //     .approve(masterChefAddress, approveValue)
  //     .send({ from: walletAddress }, function (err, res) {
  //       if (err) {

  //         console.log("An error occured", err)
  //         return
  //       }

  //       console.log("Hash of the transaction: " + res)
  //     })
  // }

  //----------------------------------------------------------------
  // moralis
  //   async function approve(){
  //   const options = {
  //     contractAddress: contractAddress,
  //     functionName: "approve",
  //     abi: abi,
  //     params: {
  //       spender : masterChefAddress,
  //       amount : approveValue
  //     }
  //   }
  //   const receipt = await Moralis.executeFunction(options);
  // return receipt
  // // setResponses(receipt.votes);
  // }

  // {chainName === NETWORK_NAMES.POLY ? <MiniFarmList /> : <GaugeList />}


  return (
    <>
      <Button type="submit" onClick={() => Right()}>
        Chcek your approval
      </Button>{right == null ? "" :
        right == false ?
          <Button type="submit" onClick={() => Approval()} >
            Approve
          </Button>
          :
          <Deposit />
      }
            <Form.Item style={{ marginBottom: "5px" }}>Blanace on you wallet : {balance} LP
             <Button type="type" onClick={() =>MaxBalance(balance)} align="center" size="small" >{config.MAX}</Button>
            </Form.Item>
    </>

  );
}
