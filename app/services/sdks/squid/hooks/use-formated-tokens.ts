import { TokenData } from '@0xsquid/sdk';
import { useState, useEffect, useCallback } from 'react';
import { useSquidHooks } from '@/globalState/squid';
import { Item } from 'react-native-picker-select';
import { capitalize } from '@/utils/methods';
import { log } from '@/utils';

export const useFormattedTokens = (chainId: string) => {
  const { setTokens, tokens } = useSquidHooks();
  const [formattedToken, setFormattedToken] = useState<Item[]>([]);
  log('chainId', chainId);

  useEffect(() => {
    (async () => {
      await setTokens();
      tokens.filter(token => token.chainId !== chainId);
      const formatTokenData = (token: TokenData) => {
        return {
          label: capitalize(token.name),
          value: token.address,
        };
      };

      const formatToken = (tokens: TokenData[]) => {
        return tokens.map(token => formatTokenData(token));
      };

      const fToken = formatToken(tokens);

      setFormattedToken(fToken);
    })();
  }, []);

  return formattedToken;
};
