import { initializeSquid } from '@/services/sdk/squid';
import { ChainData } from '@0xsquid/sdk/dist/types';
import {
  createSelectorFunctions,
  createSelectorHooks,
} from 'auto-zustand-selectors-hook';
import { StateCreator, create } from 'zustand';
import { PersistOptions, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from '../../app-persist-storage';

export interface SquidState {
  chains: ChainData[] | [];
}

export interface SquidStore extends SquidState {
  setChains: () => void;
}

const initialSquidState: SquidState = {
  chains: [],
};

type SquidPersist = (
  config: StateCreator<SquidStore>,
  options: PersistOptions<SquidStore>,
) => StateCreator<SquidStore>;

const STORE_NAME = 'kado-squid';

export const useSquidStore = create(
  (persist as SquidPersist)(
    (set, get) => ({
      ...initialSquidState,

      setChains: async () => {
        const { chains } = await initializeSquid();
        set({
          chains,
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
  useSquidStore.setState({
    ...initialSquidState,
  });
};

// @ts-ignore
export const useSquidHooks = createSelectorHooks(useSquidStore);
export const useSquidFunctions = createSelectorFunctions(useSquidStore);
