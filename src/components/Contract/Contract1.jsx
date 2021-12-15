import { Button, Card, Input, Typography, Form, notification } from "antd";
import { useMemo, useState } from "react";
// import contractInfo from "contracts/contractInfo.json";
// import fypInfo from "contracts/FYP.json";
import fypropInfo from "contracts/FYPROP.json";
import Address from "components/Address/Address";
import { useMoralis } from "react-moralis";
// import { CoinPrice } from "moralis"
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";


const { Text } = Typography;

export default function Contract() {

  const { Moralis, web3 } = useMoralis();
  const { chainId ,walletAddress}  = useMoralisDapp();
  // const { contractName, networks, abi } = contractInfo;
  const { contractName, networks, abi } = fypropInfo;



  const [responses, setResponses] = useState(10);
  const [price, setPrice] = useState(0)
// const [block, setBlock] = useState


  const contractAddress = networks[3].address;
  //   const contractAddress = networks[1337].address;
// const add
  const contract = new web3.eth.Contract(abi, contractAddress);
  // const blocknow=  contract.defaultBlock
  const displayedContractFunctions = useMemo(() => {
    if (!abi) return [];
    return abi.filter((method) => method["type"] === "function")
  }, [abi]);


  
async function gettoken (){
  const balance=await Moralis.Web3API.token.getTokenPrice({address:"0xc18360217d8f7ab5e7c516566761ea12ce7f9d72" ,chain:"0x1" })
  setPrice(balance.usdPrice )
}
// async function getblock(){
//   const blocknow=  contract.defaultBlock
// setBlock(blocknow)

// }

// function get (){
//   setPrice(price =>price +10 )
// }

  // const openNotification = ({ message, description }) => {
  //   notification.open({
  //     placement: "bottomRight",
  //     message,
  //     description,
  //     onClick: () => {
  //       console.log("Notification Clicked!");
  //     },
  //   });
  // };
  async function balanceOf(){
  const options = {
    contractAddress: contractAddress,
    functionName: "checkpoints",
    abi: abi,
    params: {
      vote : "0x67d01708eEd26A6D6d034397BAae733c441948D4",
      value : "0"

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
            Your contract: {contractName}
            <Address avatar="left" copyable address={contractAddress} size={8} />
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
   <Button onClick={()=>balanceOf()}        >
                    {/* {responses === 0 ? "BUY SOME" : "your balance "+responses} */}check your balance
                  </Button>
                  <p> {responses}</p>
    </Form.Item>
  </Card>
</Form>





        {/* <Form.Provider
          onFormFinish={async (name, { forms }) => {
            const params = forms[name].getFieldsValue();

            let isView = false;
            // let need = false;
            for (let method of abi) {
              if (method.name !== name) continue;
              if (method.stateMutability === "view") isView = true;
            }

            const options = {
              contractAddress,
              functionName: name,
              abi,
              params
            };
            if (!isView) {
              const tx = await Moralis.executeFunction({ awaitReceipt: false, ...options });
              tx.on("transactionHash", (hash) => {
                setResponses({ ...responses, [name]: { result: null, isLoading: true } });
                openNotification({
                  message: "🔊 New Transaction",
                  description: `📃 Tx Hash: https://ropsten.etherscan.io/tx/${hash}`,
                });
                console.log("🔊 New Transaction", hash);
              })
                .on("receipt", (receipt) => {
                  setResponses({ ...responses, [name]: { result: null, isLoading: false } });
                  openNotification({
                    message: "🔊 New Receipt",
                    description: `📃 Receipt: ${receipt.transactionHash}`,
                  });
                  console.log("🔊 New Receipt: ", receipt);
                })
                .on("error", (error) => {
                  console.log(error);
                });
            } else {
              Moralis.executeFunction(options).then((response) =>
                setResponses({ ...responses, [name]: { result: response, isLoading: false } })
              );
            }
          }}
        >
            <Card title={displayedContractFunctions[3].name}
              size="small"
              style={{ marginBottom: "20px" }}>

              <Form layout="vertical" name={displayedContractFunctions[3].name}>
                {displayedContractFunctions[3].inputs.map((input, key) => (
                  <Form.Item
                    label={`${input.name} (${input.type})`}
                    name={`${input.name}`}
                    required
                    style={{ marginBottom: "15px" }}
                  >
                    <Input placeholder="input placeholder" />
                  </Form.Item>
                ))}
                <Form.Item style={{ marginBottom: "5px" }}>
                  <Text style={{ display: "block" }}>
                    {responses[displayedContractFunctions[3].name]?.result && JSON.stringify(responses[displayedContractFunctions[3].name]?.result)}
                  </Text>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={responses[displayedContractFunctions[3].name]?.isLoading}
                  >
                    {displayedContractFunctions[3].stateMutability === "view" ? "Read🔎" : "Transact💸"}
                  </Button>
                </Form.Item>
              </Form>
            </Card>



            <Card title={displayedContractFunctions[4].name}
              size="small"
              style={{ marginBottom: "20px" }}>

              <Form layout="vertical" name={displayedContractFunctions[4].name}>


  
                  <Form.Item
                    label={displayedContractFunctions[4].inputs[0].name + " ( " + displayedContractFunctions[4].inputs[0].type+ " )"}
                    name={`${displayedContractFunctions[4].inputs[0].name}`}
                    required
                    style={{ marginBottom: "15px" }}

                  >

                    <Input placeholder="input placeholder"
                    value={"0xC80332C3D20C07A993b29Bf14E29Be2c9b6793d3"}/>
                  </Form.Item>

                <Form.Item style={{ marginBottom: "5px" }}>
                  <Text style={{ display: "block" }}>
                    {responses[displayedContractFunctions[4].name]?.result && JSON.stringify(responses[displayedContractFunctions[4].name]?.result)}
                  </Text>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={responses[displayedContractFunctions[4].name]?.isLoading}
                  >
                    {"Read🔎"}
                  </Button>
                </Form.Item>

                <Form.Item
                    label={contractName}
                    name={contractName}
                    required
                    style={{ marginBottom: "15px" }}

                  >

                    <Input placeholder="0xC80332C3D20C07A993b29Bf14E29Be2c9b6793d3"/>
                  </Form.Item>

                  <Form>
<Button onClick={()=>gettoken()}>
check
</Button>

<Text>{price}</Text>



                  </Form>

              </Form>
            </Card>
        </Form.Provider> */}
      </Card>
    </div>
  );
}
