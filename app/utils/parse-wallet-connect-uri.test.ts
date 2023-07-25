import { parseWalletConnectUri } from './parse-wallet-connect-uri';

describe('parseWalletConnectUri', () => {
  it('should return valid true and the uri when given a uri starting with wc:', () => {
    const uri = 'wc:some-walletc-connect-uri';
    const result = parseWalletConnectUri(uri);
    expect(result.valid).toBe(true);
    expect(result.uri).toBe(uri);
  });

  it('should return valid true and the uri when given a uri starting with the deep link prefix', () => {
    const uri = 'kado://wc?uri=some-uri';
    const result = parseWalletConnectUri(uri);
    expect(result.valid).toBe(true);
    expect(result.uri).toBe('some-uri');
  });

  it('should return valid true and the uri when given a uri starting with the universal link prefix', () => {
    const uri = 'https://links.kado.app/wc?uri=some-uri';
    const result = parseWalletConnectUri(uri);
    expect(result.valid).toBe(true);
    expect(result.uri).toBe('some-uri');
  });

  it('should return valid false when given an invalid uri', () => {
    const uri = 'invalid-uri';
    const result = parseWalletConnectUri(uri);
    expect(result.valid).toBe(false);
    expect(result.uri).toBeUndefined();
  });
});
