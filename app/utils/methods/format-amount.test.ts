import { formatAmount } from './format-amount';

describe('formatAmount', () => {
  it('should format fiat currency correctly', () => {
    expect(formatAmount('USD', '1234.5678')).toEqual('$1,234.57');
    expect(formatAmount('EUR', '9876.5432')).toEqual('€9,876.54');
  });

  it('should format crypto currency correctly', () => {
    expect(formatAmount('BTC', '0.12345678')).toEqual('0.1235 BTC');
    expect(formatAmount('ETH', '1.23456789')).toEqual('1.2346 ETH');
  });

  it('should handle invalid input gracefully', () => {
    expect(formatAmount('USD', 'invalid')).toEqual('$0.00');
    expect(formatAmount('BTC', '-123.456')).toEqual('0.0000 BTC');
  });
});
