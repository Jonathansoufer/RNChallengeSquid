import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { Signer } from 'ethers';
import Web3Modal from 'web3modal';
import { StateCreator, create } from 'zustand';
import { PersistOptions, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from '../app-persist-storage';

export interface WalletConnectState {
  isConnected: boolean;
  provider: any | null;

  web3Modal: Web3Modal | undefined;
  setWeb3Modal: (signer: Web3Modal | undefined) => void;
  signer: Signer | undefined;
  setSigner: (signer: Signer | undefined) => void;
  address: string | undefined;
  setAddress: (address: string | undefined) => void;
  reset: () => void;
}

export interface WalletConnectStore extends WalletConnectState {
  saveWalletConnectionSession: (
    address: string | undefined,
    provider?: any,
    isConnected?: boolean,
  ) => void;
}

const initialWalletConnectState: WalletConnectState = {
  isConnected: false,
  provider: null,
  web3Modal: undefined,
  setWeb3Modal: () => {},
  signer: undefined,
  setSigner: () => {},
  address: undefined,
  setAddress: () => {},
  reset: () => {},
};

type WalletConnectPersist = (
  config: StateCreator<WalletConnectStore>,
  options: PersistOptions<WalletConnectStore>,
) => StateCreator<WalletConnectStore>;

const STORE_NAME = 'kado-walletconnect';

export const useWalletConnect = create(
  (persist as WalletConnectPersist)(
    (set, get) => ({
      ...initialWalletConnectState,
      web3Modal: undefined,
      setWeb3Modal: (web3Modal: Web3Modal | undefined) =>
        set(() => ({ web3Modal })),
      signer: undefined,
      setSigner: (signer: Signer | undefined) => set(() => ({ signer })),
      address: undefined,
      setAddress: (address: string | undefined) => set(() => ({ address })),
      reset: () =>
        set(() => {
          return {
            client: undefined,
            conversations: new Map(),
            convoMessages: new Map(),
            previewMessages: new Map(),
            address: undefined,
            signer: undefined,
          };
        }),
      saveWalletConnectionSession: (
        provider?: string,
        address?: string,
        isConnected?: boolean,
      ) => {
        if (!get().isConnected) {
          set({
            address,
            isConnected,
            provider,
          });
        }
      },
    }),
    {
      name: STORE_NAME,
      getStorage: () => zustandMMKVStorage,
      serialize: state => JSON.stringify(state),
      deserialize: state => JSON.parse(state),
    },
  ),
);

export const clearWalletConnectStorage = () => {
  useWalletConnect.setState({
    ...initialWalletConnectState,
  });
};

// @ts-ignore
export const useWalletConnectHooks = createSelectorHooks(useWalletConnect);
