import { Button, Card, Input, Typography, Form, notification } from "antd";
import Address from "components/Address/Address";
import Approve from "./components/Approve"
import Widthdraw from "./components/Withdraw"
import config from "contracts/config"
import Prices from "./components/Price"


export default function Contract() {


function AlertIt() {
var answer = window.confirm("Please click on OK to continue.")
if (answer)
window.open="http://www.google.com";
}



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
      <Card>
       
   <Button onClick={AlertIt}>click</Button>

      </Card>

    </div>


  );
}
