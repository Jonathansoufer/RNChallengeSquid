import { initializeSquid } from '@/services/sdk/squid';
import { log } from '@/utils';
import { Signer, Wallet } from 'ethers';

export interface SwapParams {
  fromChain: number;
  fromToken: string;
  fromAmount: string;
  toChain: number;
  toToken: string;
  toAddress: string;
  slippage: number;
  enableForecall: boolean;
  quoteOnly: boolean;
}

interface ExecutionSettings {
  infiniteApproval?: boolean;
  setGasPrice: boolean;
}

export function useRoute() {
  const getEstimation = async (params: SwapParams) => {
    try {
      log('getEstimation Processing...', params);
      const { squid } = await initializeSquid();
      const { route } = await squid.getRoute(params);

      return { estimation: route.estimate };
    } catch (error) {
      log('getEstimation error', error);
      return { error };
    }
  };

  const executeSwap = async (
    params: SwapParams,
    signer: Signer | Wallet | undefined,
    executionSettings?: ExecutionSettings,
  ) => {
    try {
      const { squid } = await initializeSquid();
      const { route } = await squid.getRoute(params);

      if (!signer) {
        return { error: 'Signer is not set' };
      }

      log('executeSwap Processing...', signer);

      const txHash = await squid.executeRoute({
        signer,
        route,
        executionSettings,
      });
      return txHash;
    } catch (error) {
      log('executeSwap error', error);
      return { error };
    }
  };

  return {
    getEstimation,
    executeSwap,
  };
}
