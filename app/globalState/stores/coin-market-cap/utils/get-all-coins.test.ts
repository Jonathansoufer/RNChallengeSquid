import { getAllCoins } from './get-all-coins';

describe('getAllCoins', () => {
  it('should return an array of coins', async () => {
    const coins = await getAllCoins();
    expect(Array.isArray(coins)).toBe(true);
  });

  it('should return coins with the correct properties', async () => {
    const coins = await getAllCoins();
    const coin = coins[0];
    expect(coin).toHaveProperty('id');
    expect(coin).toHaveProperty('name');
    expect(coin).toHaveProperty('symbol');
    expect(coin).toHaveProperty('cmc_rank');
    expect(coin).toHaveProperty('address');
    expect(coin).toHaveProperty('quote');
  });

  it('should return coins with USD quote data', async () => {
    const coins = await getAllCoins();
    const coin = coins[0];
    expect(coin.quote).toHaveProperty('USD');
    expect(coin.quote.USD).toHaveProperty('price');
    expect(coin.quote.USD).toHaveProperty('percent_change_24h');
    expect(coin.quote.USD).toHaveProperty('percent_change_7d');
  });
});
