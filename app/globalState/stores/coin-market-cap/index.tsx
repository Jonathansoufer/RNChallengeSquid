import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { StateCreator, create } from 'zustand';
import { PersistOptions, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from '../../app-persist-storage';
import { getAllCoins } from './utils/get-all-coins';
import { MarketCapCoin } from './utils/types';

export interface CoinGeckoState {
  coins: MarketCapCoin[];
}

export interface CoinGeckoStore extends CoinGeckoState {
  fetchCoins: () => void;
}

const initialCoinGeckoState: CoinGeckoState = {
  coins: [],
};

type CoinGeckoPersist = (
  config: StateCreator<CoinGeckoStore>,
  options: PersistOptions<CoinGeckoStore>,
) => StateCreator<CoinGeckoStore>;

const STORE_NAME = 'kado-coin-gecko';

export const useCoinGecko = create(
  (persist as CoinGeckoPersist)(
    (set, get) => ({
      ...initialCoinGeckoState,

      fetchCoins: async () => {
        const coins = await getAllCoins();
        set({
          coins: coins,
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

export const clearCoinGeckoStorage = () => {
  useCoinGecko.setState({
    ...initialCoinGeckoState,
  });
};

// @ts-ignore
export const useCoinGeckoHooks = createSelectorHooks(useCoinGecko);
