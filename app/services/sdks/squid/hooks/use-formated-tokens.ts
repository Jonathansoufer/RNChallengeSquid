import { useSquidHooks } from '@/globalState/squid';
import { capitalize } from '@/utils/methods';
import { TokenData } from '@0xsquid/sdk';
import { useCallback, useState } from 'react';
import { Item } from 'react-native-picker-select';

export const useFormattedTokens = () => {
  const { setTokens, tokens } = useSquidHooks();
  const [formattedTokens, setFormattedTokens] = useState<Item[]>([]);

  const parseTokenData = (token: TokenData) => {
    return {
      label: capitalize(token.name),
      value: token.address,
    };
  };

  const parseTokens = (tokens: TokenData[]) => {
    return tokens
      .filter((element, index) => {
        return tokens.indexOf(element) === index;
      })
      .map(token => parseTokenData(token));
  };

  const filterTokens = useCallback((chainId: string) => {
    setTokens();

    const tokensFilteredByChainId = tokens.filter(
      token => token.chainId === chainId,
    );

    const ft = parseTokens(tokensFilteredByChainId);

    setFormattedTokens(ft);

    return ft;
  }, []);

  return { filterTokens, formattedTokens };
};
