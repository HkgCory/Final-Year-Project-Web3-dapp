import BigNumber from "bignumber.js"


const LPconfig={
  0:{
    pid: 3,
    lpSymbol: 'USDT-LYD LP',
    lpAddresses: {
      [ChainId.FUJI]: '0xca3953bb2011aa6a5af2a584562277bde65fa020',
      [ChainId.AVALANCHE]: '0x752c59f22faaa861108649f4596034796c69bc3f',
    },
    token: tokens.usdt,
    quoteToken: tokens.lyd,
    isFinished: false,
  },
  1:{
    pid: 1,
    lpSymbol: 'AVAX-FYP LP',
    lpAddresses: {
      [ChainId.FUJI]: '0x14520b00d8d959b847e16c3ebe5364544641baa1',
      [ChainId.AVALANCHE]: '',
    },
    token: tokens.fyp,
    quoteToken: tokens.wavax,
    tokenSymbol: 'FYP',
    quoteTokenAdresses: tokens.wavax,
    isFinished: false,
  },
  2:{
    pid: 4,
    lpSymbol: 'AVAX-LYD LP',
    lpAddresses: {
      [ChainId.FUJI]: '0x21A735A9c3f00EF3099D6a945F71d148840F4918',
      [ChainId.AVALANCHE]: '',

    },
    token: tokens.lyd,
    quoteToken: tokens.wavax,
    tokenSymbol: 'LYD',
    quoteTokenAdresses: tokens.wavax,
    isFinished: false,
  },
}
export default LPconfig