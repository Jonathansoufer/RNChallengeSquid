import { Float } from 'react-native/Libraries/Types/CodegenTypes';

export interface MarketCapCoin {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  is_active: true;
  is_fiat: number;
  self_reported_circulating_supply: number | null;
  self_reported_market_cap: number | null;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  last_updated: Date;
  date_added: Date;
  tags: [string];
  platform: any | null;
  quote: {
    USD: {
      price: Float;
      volume_24h: number;
      percent_change_1h: Float;
      percent_change_24h: Float;
      percent_change_7d: Float;
      market_cap: number;
      last_updated: Date;
    };
    BTC: {
      price: number;
      volume_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      market_cap: number;
      last_updated: Date;
    };
  };
}
