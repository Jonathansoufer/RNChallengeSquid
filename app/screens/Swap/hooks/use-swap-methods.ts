import { useFormattedTokens } from '@/services/sdk/squid';
import { Estimate } from '@0xsquid/sdk/dist/types';
import { useCallback, useState } from 'react';

import { useMetamaskStore } from '@/globalState/stores/metamask';
import { SwapParams, useRoute } from './use-route';

export function useSwapMethods() {
  const { getListOfTokens } = useFormattedTokens();
  const { getEstimation } = useRoute();
  const { chainId } = useMetamaskStore();
  const [isReadyToSwap, setIsReadyToSwap] = useState<boolean>(false);
  const [tokens, setTokens] = useState<{ fromTokens: any[]; toTokens: any[] }>({
    fromTokens: [],
    toTokens: [],
  });

  const [swapParams, setSwapParams] = useState<SwapParams>({
    fromChain: Number(chainId),
    fromToken: '',
    fromAmount: '',
    toChain: 0,
    toToken: '',
    toAddress: '',
    slippage: 1.0,
    enableForecall: true,
    quoteOnly: false,
  });

  const [currentEstimation, setCurrentEstimation] = useState<
    Estimate | undefined
  >();

  const caculateSumOfCosts = (preValue: number, currValue: number): number => {
    preValue += currValue;
    return preValue;
  };

  const getSwapEstimation = useCallback(async () => {
    const { estimation } = await getEstimation(swapParams);

    setCurrentEstimation(estimation);
  }, [isReadyToSwap]);

  const handleFromChainChange = async (chainFromId: string) => {
    const formattedTokens = await getListOfTokens(chainFromId);

    setSwapParams({
      ...swapParams,
      fromChain: Number(chainFromId),
    });
    setTokens({
      ...tokens,
      fromTokens: formattedTokens,
    });
  };

  const handleToChainChange = async (chainToId: string) => {
    const formattedTokens = await getListOfTokens(chainToId);
    setSwapParams({
      ...swapParams,
      toChain: Number(chainToId),
    });
    setTokens({
      ...tokens,
      toTokens: formattedTokens,
    });
  };

  return {
    caculateSumOfCosts,
    getSwapEstimation,
    handleFromChainChange,
    handleToChainChange,
    currentEstimation,
    setSwapParams,
    swapParams,
    setIsReadyToSwap,
    isReadyToSwap,
    tokens,
  };
}
