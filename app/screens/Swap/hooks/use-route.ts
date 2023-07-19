import { initializeSquid } from '@/services/sdks/squid';
import { log } from '@/utils';

import { SignClient } from '@walletconnect/sign-client';

interface TradeParams {
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
  const getEstimation = async (params: TradeParams) => {
    const { squid } = await initializeSquid();
    log('getEstimation params', params);

    const { route, requestId, integratorId } = await squid.getRoute(params);

    log('getEstimation', route, requestId, integratorId);

    return { estimation: route.estimate };
  };

  const executeSwap = async (
    params: TradeParams,
    executionSettings?: ExecutionSettings,
  ) => {
    const { squid } = await initializeSquid();
    const { route } = await squid.getRoute(params);
    const signClient = await SignClient.init({
      projectId: 'a5397947dc05faa107548a550fe77cc9',
    });

    let signer: any = signClient;

    const txHash = await squid.executeRoute({
      signer,
      route,
      executionSettings,
    });

    return txHash;
  };

  return {
    getEstimation,
    executeSwap,
  };
}
