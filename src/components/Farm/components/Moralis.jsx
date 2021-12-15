
import { Button, Card, Input, Typography, Form, notification } from "antd";
import { useMemo, useState } from "react";

import fypropInfo from "contracts/FYPROP.json";
import Address from "components/Address/Address";
import { useMoralis } from "react-moralis";
// import { CoinPrice } from "moralis"
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import Approve from "./components/Approve"
import Widthdraw from "./components/Withdraw"
import config from "contracts/config"

const { Text } = Typography;
export default function Moralis() {
  const { Moralis, web3 } = useMoralis();
  const { chainId, walletAddress } = useMoralisDapp();
  const { contractName, networks, abi } = fypropInfo;

  const [responses, setResponses] = useState(10);
  const contractAddress = networks[3].address;
  //   const contractAddress = networks[1337].address;
  // const add
  const contract = new web3.eth.Contract(abi, contractAddress);

  const displayedContractFunctions = useMemo(() => {
    if (!abi) return [];
    return abi.filter((method) => method["type"] === "function")
  }, [abi]);


async function balanceOf() {
  const options = {
    contractAddress: contractAddress,
    functionName: "checkpoints",
    abi: abi,
    params: {
      vote: "0x67d01708eEd26A6D6d034397BAae733c441948D4",
      value: "0"
      // account: walletAddress,
      //   amount: Moralis.Units.Token("0.5", "18")
    }
  }
  const receipt = await Moralis.executeFunction(options);
  setResponses(receipt.votes);
}


return (
  <div style={{ margin: "auto", width: "40vw" }}>
    <Card
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Staking LP and Earn FYP
          <Address avatar="left" copyable address={config.ROP.LPInfo} size={8} />
        </div>
      }
      size="large"
      style={{ marginTop: 25, width: "100%" }}
    >
      <Form>
        <Card title={displayedContractFunctions[4].name}
          size="small"
          style={{ marginBottom: "20px" }}>
          <Form.Item style={{ marginBottom: "5px" }}>
          </Form.Item>
          <Form.Item style={{ marginBottom: "5px" }}>
            <Button onClick={() => balanceOf()}        >
              check your balance
            </Button>
            <p> {responses}</p>
          </Form.Item>
        </Card>
      </Form>
    </Card>

  </div>


);
}