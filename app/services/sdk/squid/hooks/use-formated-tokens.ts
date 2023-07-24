import { capitalize } from '@/utils/methods';
import { TokenData } from '@0xsquid/sdk';
import { initializeSquid } from './use-squid-initialization';

export function useFormattedTokens() {
  let filteredTokens: TokenData[] | [];

  const parseTokenData = (token: TokenData) => {
    return {
      label: capitalize(token.name),
      value: token.address,
    };
  };

  const parseTokens = (tokens: TokenData[]) => {
    return tokens.map(token => parseTokenData(token));
  };

  const getListOfTokens = async (chainId: string) => {
    const { tokens } = await initializeSquid();
    filteredTokens = tokens.filter(t => t.chainId === chainId) ?? [];

    const pardedTokens = parseTokens(filteredTokens);

    return pardedTokens;
  };

  return { getListOfTokens };
}
