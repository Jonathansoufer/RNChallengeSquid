const DEEP_LINK = 'kado://wc';
const DEEP_LINK_PREFIX = `${DEEP_LINK}?uri=`;
const UNIVERSAL_LINK = 'https://links.kado.app/wc';
const UNIVERSAL_LINK_PREFIX = `${UNIVERSAL_LINK}?uri=`;

/**
 * @param {string} uri - the uri to parse WalletConnectUri
 * @returns {({ valid: boolean; uri: string || undefined } | { valid: boolean; uri?: undefined; })} - return the parsed WalletConnectUri
 */
export function parseWalletConnectUri(uri: string) {
  if (uri.startsWith('wc:')) {
    return {
      valid: true,
      uri,
    };
  }

  if (uri.startsWith(DEEP_LINK)) {
    return {
      valid: true,
      uri: uri.substr(DEEP_LINK_PREFIX.length),
    };
  }

  if (uri.startsWith(UNIVERSAL_LINK)) {
    return {
      valid: true,
      uri: uri.substr(UNIVERSAL_LINK_PREFIX.length),
    };
  }

  return {
    valid: false,
  };
}
