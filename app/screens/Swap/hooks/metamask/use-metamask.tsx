import { Linking } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

import MetaMaskSDK from '@metamask/sdk';

import { log } from '@/utils';
import { ethers } from 'ethers';
import { useState } from 'react';

export const useMetamask = () => {
  const [signer, setSigner] = useState<ethers.Signer>();
  log('useMetamask initializing...');
  const sdk = new MetaMaskSDK({
    openDeeplink: link => {
      Linking.openURL(link);
    },
    timer: BackgroundTimer,
    dappMetadata: {
      name: 'Kado Challenge mobile dApp',
      url: 'kado.money',
    },
  });
  log('useMetamask initialized!');

  const ethereum = sdk.getProvider();

  const provider = new ethers.providers.Web3Provider(ethereum as any);

  const _signer = provider.getSigner();

  setSigner(_signer);

  return {
    signer,
  };
};
