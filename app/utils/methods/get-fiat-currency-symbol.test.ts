import { getFiatCurrencySymbol } from './get-fiat-currency-symbol';

describe('getFiatCurrencySymbol', () => {
  it('returns the correct symbol for a valid currency code', () => {
    expect(getFiatCurrencySymbol('USD')).toBe('$');
    expect(getFiatCurrencySymbol('EUR')).toBe('€');
    expect(getFiatCurrencySymbol('JPY')).toBe('¥');
  });

  it('returns $ for an invalid currency code', () => {
    expect(getFiatCurrencySymbol('XYZ')).toBe('$');
  });

  it('is case-insensitive', () => {
    expect(getFiatCurrencySymbol('usd')).toBe('$');
    expect(getFiatCurrencySymbol('eur')).toBe('€');
    expect(getFiatCurrencySymbol('jpy')).toBe('¥');
  });
});
