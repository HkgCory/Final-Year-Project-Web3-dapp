import { Button, Card, Input, Typography, Form, notification } from "antd";
import { useMemo, useState } from "react";
// import contractInfo from "contracts/contractInfo.json";
import LPInfo from "contracts/Pair.json";
import Address from "components/Address/Address";
import { useMoralis } from "react-moralis";
// import { CoinPrice } from "moralis"
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import config from "contract/config"

const { Text } = Typography;

export default function Approve() {

  const { Moralis, web3 } = useMoralis();
  const { chainId ,walletAddress}  = useMoralisDapp();
  const { abi } = LPInfo;
  const contractAddress = config.ROP.LPInfo

  const [responses, setResponses] = useState(10);
  const [price, setPrice] = useState(0)

  const contract = new web3.eth.Contract(abi, contractAddress);
  
// async function gettoken (){
//   const balance=await Moralis.Web3API.token.getTokenPrice({address:"0xc18360217d8f7ab5e7c516566761ea12ce7f9d72" ,chain:"0x1" })
//   setPrice(balance.usdPrice )
// }

  async function approve(){
  const options = {
    contractAddress: contractAddress,
    functionName: "checkpoints",
    abi: abi,
    params: {
      spender : "0x67d01708eEd26A6D6d034397BAae733c441948D4",
      amount : "0"
    }
  }
  const receipt = await Moralis.executeFunction(options);

setResponses(receipt.votes);
}


  return (
<div>
    <Button onClick={()=>approve() }>
    approve
    </Button>

</div>
  );
}
