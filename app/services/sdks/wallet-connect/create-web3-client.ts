import { Core } from '@walletconnect/core';
import { ICore } from '@walletconnect/types';
import { IWeb3Wallet, Web3Wallet } from '@walletconnect/web3wallet';

export let web3wallet: IWeb3Wallet;
export let core: ICore;

core = new Core({
  projectId: process.env.PROJECT_ID,
});

export async function createWeb3Wallet() {
  const web3wallet = await Web3Wallet.init({
    core,
    metadata: {
      name: 'Kado Wallet',
      description: 'Demo RN Wallet to interface with Dapps & WalletConnect',
      url: 'www.walletconnect.com',
      icons: [],
    },
  });
}

export async function pair(params: { uri: string }) {
  return await core.pairing.pair({ uri: params.uri });
}
