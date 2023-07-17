import { StateCreator, create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { zustandMMKVStorage } from '../app-persist-storage';

export interface WalletConnectState {
  address: string | null;
  isConnected: boolean;
  provider: any | null;
}

export interface WalletConnectStore extends WalletConnectState {
  saveWalletConnectionSession: (
    provider?: any,
    address?: string,
    isConnected?: boolean,
  ) => void;
}

const initialWalletConnectState: WalletConnectState = {
  provider: null,
  address: null,
  isConnected: false,
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
