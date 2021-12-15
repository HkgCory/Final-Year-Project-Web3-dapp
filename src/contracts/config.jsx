import BigNumber from "bignumber.js"

const config = {
    ROP: {
        MasterChef: "0x3a69A544fd917327852f5606E55FB29E16281e25",
        FYP: "0x169DCceC4023d93fF0fa05Dcc9849E6e7F04Dc0C",
        LPInfo: "0x759f56df547930f8607ee4b49b432b0f71b97873",
        networks: 3
    },
    FUJI: {
        MasterChef: "0x1100476d796792177D5922290dc13361454cFFC5",
        FYP: "0xb6d29a1c56146319e0c67213529b30E0410D09B2",
        LPInfo: "0x09c7e6eb4341a8509a8e35b22d9446a24084963b",
        Timelock:"0x35Dd565384AAe93fDa2946d068f74eD1854EaE3B",
        Router:"0x2D99ABD9008Dc933ff5c0CD271B88309593aB921",
        WAVAX:"0xd00ae08403b9bbb9124bb305c09058e32c39a48c",
        USDT:"0x08a978a0399465621e667c49cd54cc874dc064eb",
        networks: 43113,
        pid:0
    },
    AVAX: {
        //not supported
        MasterChef: "0x3a69A544fd917327852f5606E55FB29E16281e25",
        FYP: "0x169DCceC4023d93fF0fa05Dcc9849E6e7F04Dc0C",
        LPInfo: "0x759f56df547930f8607ee4b49b432b0f71b97873",
        XAVA:"0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
        networks: 43114
    },

    approve: BigNumber(100000000000000000000000000000000000),
    decimal: 35,
    decimals: BigNumber(1000000000000000000),
}


export default config