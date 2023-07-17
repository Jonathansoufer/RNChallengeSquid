import api from '@/services/api/axios';
import { log } from '@/utils';
import { MarketCapCoin } from './types';

/**
 *
 * @returns {Promise<MarketCapCoin[]>}
 * @description Get all coins from CoinMarketCap.
 */

export const getAllCoins = async () => {
  try {
    const response = await api.get('cryptocurrency/trending/most-visited');
    const { data } = response.data.data;
    const fCoins = data.map((coin: MarketCapCoin) => {
      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        cmc_rank: coin.cmc_rank,
        address: coin.platform?.token_address || '',
        quote: {
          USD: {
            price: coin.quote.USD.price,
            percent_change_24h: coin.quote.USD.percent_change_24h,
            percent_change_7d: coin.quote.USD.percent_change_7d,
          },
        },
      };
    });
    return fCoins;
  } catch (e) {
    log(e);
  }
};
