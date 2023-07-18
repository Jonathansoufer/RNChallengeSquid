import { StateCreator, create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import {
  createSelectorFunctions,
  createSelectorHooks,
} from 'auto-zustand-selectors-hook';
import { ChainData, TokenData } from '@0xsquid/sdk/dist/types';
import { initializeSquid } from '@/services/sdks/squid';
import { zustandMMKVStorage } from '../app-persist-storage';
import { log } from '@/utils';

export interface SquidState {
  tokens: TokenData[] | [];
  chains: ChainData[] | [];
}

export interface SquidStore extends SquidState {
  setTokens: () => void;
  setChains: () => void;
}

const initialSquidState: SquidState = {
  tokens: [],
  chains: [],
};

type SquidPersist = (
  config: StateCreator<SquidStore>,
  options: PersistOptions<SquidStore>,
) => StateCreator<SquidStore>;

const STORE_NAME = 'kado-squid';

export const useSquid = create(
  (persist as SquidPersist)(
    (set, get) => ({
      ...initialSquidState,
      setTokens: async () => {
        const { tokens } = await initializeSquid();
        log('tokens', tokens);
        set({
          tokens,
        });
      },
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
  useSquid.setState({
    ...initialSquidState,
  });
};

// @ts-ignore
export const useSquidHooks = createSelectorHooks(useSquid);
export const useSquidFunctions = createSelectorFunctions(useSquid);
