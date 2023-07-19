import { zustandMMKVStorage } from '@/globalState/app-persist-storage';
import { useWalletConnect } from '@/globalState/wallet-connect';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { useCallback, useEffect } from 'react';
import Web3Modal, { IProviderOptions } from 'web3modal';

const ETH_CHAIN_ID = 1;

const cachedLookupAddress = new Map<string, string | undefined>();
const cachedResolveName = new Map<string, string | undefined>();
const cachedGetAvatarUrl = new Map<string, string | undefined>();

// This variables are not added in state on purpose.
// It saves few re-renders which then trigger the children to re-render
// Consider the above while moving it to state variables
let provider: ethers.providers.Web3Provider;

export const useWalletProvider = () => {
  const web3Modal = useWalletConnect(state => state.web3Modal);
  const setWeb3Modal = useWalletConnect(state => state.setWeb3Modal);
  const setAddress = useWalletConnect(state => state.setAddress);
  const setSigner = useWalletConnect(state => state.setSigner);
  const reset = useWalletConnect(state => state.reset);

  const resolveName = useCallback(async (name: string) => {
    if (cachedResolveName.has(name)) {
      return cachedResolveName.get(name);
    }

    const { chainId } = (await provider?.getNetwork()) || {};

    if (Number(chainId) !== ETH_CHAIN_ID) {
      return undefined;
    }
    const address = (await provider?.resolveName(name)) || undefined;
    cachedResolveName.set(name, address);
    return address;
  }, []);

  const lookupAddress = useCallback(async (address: string) => {
    if (cachedLookupAddress.has(address)) {
      return cachedLookupAddress.get(address);
    }
    const { chainId } = (await provider?.getNetwork()) || {};

    if (Number(chainId) !== ETH_CHAIN_ID) {
      return undefined;
    }

    const name = (await provider?.lookupAddress(address)) || undefined;
    cachedLookupAddress.set(address, name);
    return name;
  }, []);

  const getAvatarUrl = useCallback(async (name: string) => {
    if (cachedGetAvatarUrl.has(name)) {
      return cachedGetAvatarUrl.get(name);
    }
    const avatarUrl = (await provider?.getAvatar(name)) || undefined;
    cachedGetAvatarUrl.set(name, avatarUrl);
    return avatarUrl;
  }, []);

  // Note, this triggers a re-render on acccount change and on diconnect.
  const disconnect = useCallback(() => {
    Object.keys(zustandMMKVStorage).forEach(key => {
      if (key.startsWith('kado')) {
        zustandMMKVStorage.removeItem(key);
      }
    });
    reset();
  }, [web3Modal]);

  const handleAccountsChanged = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const connect = useCallback(async () => {
    if (!web3Modal) {
      throw new Error('web3Modal not initialized');
    }
    try {
      const instance = await web3Modal.connect();
      if (!instance) {
        return;
      }
      instance.on('accountsChanged', handleAccountsChanged);
      provider = new ethers.providers.Web3Provider(instance, 'any');
      const newSigner = provider.getSigner();
      setSigner(newSigner);
      setAddress(await newSigner.getAddress());
      console.log('newSigner', newSigner);
      return newSigner;
    } catch (e) {
      // TODO: better error handling/surfacing here.
      // Note that web3Modal.connect throws an error when the user closes the
      // modal, as "User closed modal"
      console.log('error', e);
    }
  }, [handleAccountsChanged, web3Modal]);

  useEffect(() => {
    const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
    const providerOptions: IProviderOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId,
        },
      },
    };

    !web3Modal &&
      setWeb3Modal(new Web3Modal({ cacheProvider: true, providerOptions }));
  }, []);

  useEffect(() => {
    if (!web3Modal) {
      return;
    }
    const initCached = async () => {
      try {
        const cachedProviderJson = await zustandMMKVStorage.getItem(
          'WEB3_CONNECT_CACHED_PROVIDER',
        );
        if (!cachedProviderJson) {
          return;
        }
        const cachedProviderName = JSON.parse(cachedProviderJson);
        const instance = await web3Modal.connectTo(cachedProviderName);
        if (!instance) {
          return;
        }
        instance.on('accountsChanged', handleAccountsChanged);
        provider = new ethers.providers.Web3Provider(instance, 'any');
        const newSigner = provider.getSigner();
        setSigner(newSigner);
        setAddress(await newSigner.getAddress());
      } catch (e) {
        console.error(e);
      }
    };
    initCached();
  }, [web3Modal]);

  return {
    resolveName,
    lookupAddress,
    getAvatarUrl,
    connect,
    disconnect,
  };
};
