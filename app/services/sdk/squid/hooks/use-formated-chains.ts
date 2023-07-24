import { useSquidHooks } from '@/globalState/stores/squid';
import { capitalize } from '@/utils/methods';
import { ChainData } from '@0xsquid/sdk';
import { useEffect, useState } from 'react';
import { Item } from 'react-native-picker-select';

export function useFormattedChains() {
  const { setChains, chains } = useSquidHooks();
  const [formattedChains, setFormattedChains] = useState<Item[]>([]);

  const formatChainData = (chain: ChainData) => {
    return {
      label: capitalize(chain.chainName),
      value: chain.chainId,
    };
  };

  const formatChains = (chains: ChainData[]) => {
    return chains.map(chain => formatChainData(chain));
  };

  useEffect(() => {
    (async () => {
      await setChains();

      const fChains = formatChains(chains);

      setFormattedChains(fChains);
    })();
  }, []);

  return formattedChains;
}
