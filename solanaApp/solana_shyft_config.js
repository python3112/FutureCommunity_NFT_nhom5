import { ShyftSdk, Network } from '@shyft-to/js';

const shyftSdk = new ShyftSdk({
  solanaCluster: 'devnet', // or 'mainnet-beta'
  rpcEndpoint: 'https://api.devnet.solana.com', // or 'https://api.devnet.solana.com'
  commitment: 'finalized',
});

export default shyftSdk;