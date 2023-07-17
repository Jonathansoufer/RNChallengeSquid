import { log } from '@/utils';
import { Squid } from '@0xsquid/sdk';

export const initializeSquid = async () => {
  const squid = new Squid({
    baseUrl: 'https://testnet.api.squidrouter.com',
    integratorId: 'kado-challenge-sdk',
  });

  squid.setConfig({
    baseUrl: 'https://testnet.api.squidrouter.com',
    integratorId: 'kado-challenge-sdk',
  });

  await squid.init();
  log('>>> Squid initialized');

  const { chains = [], tokens = [] } = squid;

  return { chains, tokens };
};
