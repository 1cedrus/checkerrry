import { NetworkInfo } from '../types';

const LOGO_FOLDER =
  'https://raw.githubusercontent.com/Koniverse/SubWallet-ChainList/master/packages/chain-list/src/logo';

export const SUPPORTED_NETWORKS: NetworkInfo[] = [
  {
    id: 'polkadot',
    name: 'Polkadot',
    logo: `${LOGO_FOLDER}/polkadot.png`,
    provider: 'wss://rpc.polkadot.io',
    prefix: 0,
    symbol: 'DOT',
    decimals: 10,
    subscanUrl: 'https://polkadot.subscan.io',
  },
  {
    id: 'kusama',
    name: 'Kusama',
    logo: `${LOGO_FOLDER}/kusama.png`,
    provider: 'wss://kusama-rpc.polkadot.io',
    prefix: 2,
    symbol: 'KSM',
    decimals: 12,
    subscanUrl: 'https://kusama.subscan.io',
  },
  {
    id: 'rococo',
    name: 'Rococo',
    logo: `${LOGO_FOLDER}/rococo.png`,
    provider: 'wss://rococo-rpc.polkadot.io',
    prefix: 42,
    symbol: 'ROC',
    decimals: 12,
    subscanUrl: 'https://rococo.subscan.io',
  },
  {
    id: 'westend',
    name: 'Westend',
    logo: `${LOGO_FOLDER}/westend.png`,
    provider: 'wss://westend-rpc.polkadot.io',
    prefix: 42,
    symbol: 'WND',
    decimals: 12,
    subscanUrl: 'https://westend.subscan.io',
  },
  {
    id: 'astar',
    name: 'Astar',
    logo: `${LOGO_FOLDER}/astar-network.png`,
    provider: 'wss://rpc.astar.network',
    prefix: 5,
    symbol: 'ASTR',
    decimals: 18,
    subscanUrl: 'https://astar.subscan.io',
  },
];
