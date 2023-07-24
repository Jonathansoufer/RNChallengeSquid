import { useMetamaskStore } from '@/globalState/stores/metamask';
import { log } from '@/utils';
import MetaMaskSDK from '@metamask/sdk';
import { Linking } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

export function useMetamaskSDK() {
  const {
    setAccounts,
    setAccount,
    setChainId,
    account,
    setProvider,
    setBalance,
    setSigner,
    signer,
  } = useMetamaskStore();

  const MMSDK = new MetaMaskSDK({
    openDeeplink: link => {
      Linking.openURL(link);
    },
    timer: BackgroundTimer,
    dappMetadata: {
      name: 'Kado',
      url: 'https://kado.money',
    },
  });

  const provider = MMSDK.getProvider();

  const getConnectedToMetamask = async () => {
    try {
      log('requestedAccounts :: connecting...', provider);
      setProvider(provider);
      const requestedAccounts = await provider.request({
        method: 'eth_requestAccounts',
      });

      setAccount(requestedAccounts?.[0]);
      log('requestedAccounts :: connected!', requestedAccounts?.[0]);

      setSigner(provider.getSigner());

      return requestedAccounts?.[0];
    } catch (e) {
      log('ERROR', e);
    }
  };

  const getAccounts = async () => {
    try {
      const accs = await provider.request({ method: 'eth_accounts' });
      setAccounts(accs);
      return accs;
    } catch (e) {
      log('getAccounts ERROR', e);
    }
  };

  const getChainId = async () => {
    try {
      const cId = await provider.request({ method: 'eth_chainId' });
      setChainId(cId);
      return cId;
    } catch (e) {
      log('getChainId ERROR', e);
    }
  };

  const getBalance = async () => {
    setBalance();
  };

  return {
    getConnectedToMetamask,
    getAccounts,
    getBalance,
    getChainId,
    connectedAccount: account,
    signer,
  };
}
