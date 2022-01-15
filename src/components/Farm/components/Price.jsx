
import { Button, Card, Input, Typography, Form, notification } from "antd";
import { useMemo, useState } from "react";
import routerabi from "contracts/FUJIRouterPng.json";
import BigNumber from "bignumber.js";
import wava from "contracts/FujiWAVAX.json"
import fyp from "contracts/FYPFUJI.json"
import lp from "contracts/PairFUJI.json"
import master from "contracts/MasterFUJI.json"
import config from "contracts/config"

const { Text } = Typography;

export default function Price() {
    const Web3 = require('web3');
    const web3 = new Web3("https://api.avax-test.network/ext/bc/C/rpc");
    let Routerabi = routerabi;
    let RouterAddress = config.FUJI.Router.toLowerCase();

    let FYPAddress = config.FUJI.FYP.toLowerCase();
    let fypabi = fyp;

    let LPaddress= config.FUJI.LPInfo.toLowerCase();
    let lpabi = lp

    let wavaxaddress = config.FUJI.WAVAX.toLowerCase();
    let wavaxabi = wava;

    let masteraddress = config.FUJI.MasterChef.toLowerCase();
    let masterabi = master;

  

    let masterAddress= config.FUJI.MasterChef.toLowerCase();
    const [prices, setPrice] = useState(0)
    const [Apr,setApr]= useState(0)
    const calcPrice= async function() {
        let fypprice; 
        let ToSell = web3.utils.toWei("1", "ether");
        try {
            let router = await new web3.eth.Contract(Routerabi, RouterAddress);
            fypprice = await router.methods.getAmountsOut(ToSell, [FYPAddress, wavaxaddress]).call();
            fypprice = web3.utils.fromWei(fypprice[1]);
            console.log(`fypprice${fypprice}`)
        } catch (error) { }


        let balFYP
        let balWAVAX
        let totalSupply
        let balMaster
        let APR= web3.utils.fromWei('0')
        let fypperBlock
        let yearBock = web3.utils.fromWei('10512000','wei');

            let fypcontract = await new web3.eth.Contract(fypabi, FYPAddress);
            balFYP = await fypcontract.methods.balanceOf(LPaddress).call();
            balFYP = web3.utils.fromWei(balFYP);
            console.log(`balFYP ${balFYP}`)
            
            let wavaxcontract = await new web3.eth.Contract(wavaxabi, wavaxaddress);
            balWAVAX = await wavaxcontract.methods.balanceOf(LPaddress).call();
            balWAVAX = web3.utils.fromWei(balWAVAX);
            console.log(`balWAVAX ${balWAVAX}`)
            
            let lpcontract = await new web3.eth.Contract(lpabi, LPaddress);
            totalSupply = await lpcontract.methods.totalSupply().call();
            totalSupply = web3.utils.fromWei(totalSupply);
            console.log(`totalSupply ${totalSupply}`)

            balMaster = await lpcontract.methods.balanceOf(masterAddress).call();
            balMaster = web3.utils.fromWei(balMaster);
            console.log(`balMaster ${balMaster}`)

            let mastercontract = await new web3.eth.Contract(masterabi, masteraddress);
            fypperBlock = await mastercontract.methods.fypPerBlock().call();
            fypperBlock = web3.utils.fromWei(fypperBlock);
            console.log(`fypperBlock ${fypperBlock}`)
            console.log(`yearBock ${yearBock}`)

            APR = 100*(fypprice*fypperBlock*yearBock)/(Number(fypprice*balFYP)*balMaster/totalSupply)
            console.log(`APR ${APR}`)
            setApr(APR)
            setPrice(fypprice)
            // if (!fypprice) return 0;
            // return fypprice;
    }
    calcPrice()

    return (
        <>
            {/* <Button onClick={async () => {
                let Price = await calcPrice() // query pancakeswap to get the price of BNB in USDT
                console.log(`CURRENT PRICE: ${Price}`);
                setPrice(Price)
            }}>Check Current Price of FYP Token</Button> */}
            <div>1 FYP = {prices} AVAX</div>
            <div>The Pool Interest Rate (APR) : {Apr} %</div>
        </>
    )
}
