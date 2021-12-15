import { Button, Card, Input, Typography, Form, notification } from "antd";
import { useMemo, useState } from "react";
import fypropInfo from "contracts/FYPROP.json";
import Address from "components/Address/Address";
import { useMoralis } from "react-moralis";
import { CoinPrice } from "moralis"
import config from "contracts/config"
const { Text } = Typography;

export default function Contract() {
  const { Moralis } = useMoralis();
  // const { contractName, networks, abi } = contractInfo;
  const { contractName, abi } = fypropInfo;
  const [responses, setResponses] = useState({});
  const contractAddress = config.ROP.FYPROP;

  // const contractAddress = networks[3].address;
  // const contractAddress = networks[1337].address;
  const displayedContractFunctions = useMemo(() => {
    if (!abi) return [];
    return abi.filter((method) => method["type"] === "function");
  }, [abi]);

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

  function Needed(){

    if (displayedContractFunctions=== 'approve') {
  
      return <h1>{abi}</h1>

    }
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
                  {/* <Card>
          <CoinPrice address={contractAddress} chain={networks} image="https://img.png" size="40px" />
          </Card> */}
        <Form.Provider
          onFormFinish={async (name, { forms }) => {
            const params = forms[name].getFieldsValue();

            let isView = false;
            let need = false;
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
                  description: `📃 Tx Hash: ${hash}`,
                  OnClick: () => window.open("https://www.google.com/" ,"_blank")
                });
                console.log("🔊 New Transaction", hash);
              })
                .on("receipt", (receipt) => {
                  setResponses({ ...responses, [name]: { result: null, isLoading: false } });
                  openNotification({
                    message: "🔊 New Receipt",
                    description: `📃 Receipt: ${receipt.transactionHash}`,
                    OnClick: () => window.open("https://www.google.com/" ,"_blank")
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

          {displayedContractFunctions
          &&
            displayedContractFunctions.map((item, key) => (
              <Card
                title={`${key + 1}. ${item?.name}`}
                size="small"
                style={{ marginBottom: "20px" }}
              >
                <Form layout="vertical" name={`${item.name}`}>
                  {item.inputs.map((input, key) => (
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
                      {responses[item.name]?.result && JSON.stringify(responses[item.name]?.result)}
                    </Text>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={responses[item?.name]?.isLoading}
                    >
                      {item.stateMutability === "view" ? "Read🔎" : "Transact💸"}
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            ))}
        </Form.Provider>
      </Card>
    </div>
  );
}
