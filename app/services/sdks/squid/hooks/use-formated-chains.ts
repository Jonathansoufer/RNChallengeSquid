import { ChainData } from '@0xsquid/sdk';
import { useState, useEffect } from 'react';
import { useSquidHooks } from '@/globalState/squid';
import { Item } from 'react-native-picker-select';
import { capitalize } from '@/utils/methods';
export const useFormattedChains = () => {
  const { setChains, chains } = useSquidHooks();
  const [formattedChains, setFormattedChains] = useState<Item[]>([]);

  useEffect(() => {
    (async () => {
      await setChains();
      const formatChainData = (chain: ChainData) => {
        return {
          label: capitalize(chain.chainName),
          value: chain.chainId,
        };
      };

      const formatChains = (chains: ChainData[]) => {
        return chains.map(chain => formatChainData(chain));
      };

      const fChains = formatChains(chains);

      setFormattedChains(fChains);
    })();
  }, []);

  return formattedChains;
};
