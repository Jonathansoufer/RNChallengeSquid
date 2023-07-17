import axios from 'axios';
import {
  ChainsData,
  GetRoute,
  GetStatus,
  RouteResponse,
  StatusResponse,
  TokensData,
} from '@/services/sdks/squid';

export const useSquid = () => {
  const getChains = async (): Promise<ChainsData> => {
    const result: ChainsData = await axios.get(
      `${process.env.SQUID_TEST_URL}/chains`,
    );
    return result;
  };

  const getTokens = async (): Promise<TokensData> => {
    const result: TokensData = await axios.get(
      `${process.env.SQUID_TEST_URL}/tokens`,
    );
    return result;
  };

  const getRoute = async (params: GetRoute): Promise<RouteResponse> => {
    const result: RouteResponse = await axios.get(
      `${process.env.SQUID_TEST_URL}/route`,
      {
        params,
        headers: {
          'x-integrator-id': 'your-integrator-id',
        },
      },
    );
    return result;
  };

  const getStatus = async ({
    transactionId,
  }: GetStatus): Promise<StatusResponse> => {
    const result: StatusResponse = await axios.get(
      `${process.env.SQUID_TEST_URL}/status`,
      {
        params: {
          transactionId,
        },
        headers: {
          'x-integrator-id': 'your-integrator-id',
        },
      },
    );
    return result;
  };

  return {
    getChains,
    getTokens,
    getRoute,
    getStatus,
  };
};
