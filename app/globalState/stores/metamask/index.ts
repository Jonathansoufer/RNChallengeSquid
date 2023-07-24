import {
  createSelectorFunctions,
  createSelectorHooks,
} from 'auto-zustand-selectors-hook';
import { ethers } from 'ethers';
import { StateCreator, create } from 'zustand';
import { PersistOptions, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from '../../app-persist-storage';

export interface MetamaskState {
  account: string | null;
  accounts: string[] | null;
  chainId: string | null;
  signer: ethers.Signer | ethers.Wallet | null;
  // TODO: add specificts types avoid a bad practice of using any
  provider: any;
  balance: string | null;
}

export interface MetamaskStore extends MetamaskState {
  setAccounts: (accounts: string[]) => void;
  setAccount: (account: string) => void;
  setChainId: (chainId: string) => void;
  setProvider: (provider: any) => void;
  setBalance: () => void;
  setSigner: (signer: ethers.Signer | ethers.Wallet | null) => void;
}

const initialMetamaskState: MetamaskState = {
  account: null,
  accounts: [],
  chainId: null,
  provider: null,
  signer: null,
  balance: null,
};

type MetamaskPersist = (
  config: StateCreator<MetamaskStore>,
  options: PersistOptions<MetamaskStore>,
) => StateCreator<MetamaskStore>;

const STORE_NAME = 'kado-Metamask';

export const useMetamaskStore = create(
  (persist as MetamaskPersist)(
    (set, get) => ({
      ...initialMetamaskState,
      setAccounts: async (accounts: string[]) => {
        set({
          accounts,
        });
      },
      setAccount: async (account: string) => {
        set({
          account,
        });
      },

      setChainId: async (chainId: string) => {
        set({
          chainId,
        });
      },

      setSigner: async (signer: ethers.Signer | ethers.Wallet | null) => {
        set({
          signer,
        });
      },

      setProvider: async (provider: any) => {
        set({
          provider,
        });
      },
      setBalance: async () => {
        if (get().account === null) {
          return;
        }
        const bal = await get().provider.getBalance(get().account);
        set({
          balance: bal,
        });
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
  useMetamaskStore.setState({
    ...initialMetamaskState,
  });
};

// @ts-ignore
export const useMetamaskHooks = createSelectorHooks(useMetamaskStore);
export const useMetamaskFunctions = createSelectorFunctions(useMetamaskStore);
