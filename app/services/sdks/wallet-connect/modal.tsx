import { Pressable, Text } from 'react-native';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';

import { projectId, providerMetadata } from './config';

export function WCModal() {
  const { open, isConnected } = useWalletConnectModal();
  return (
    <>
      <Pressable onPress={() => open()}>
        <Text>{isConnected ? 'View Account' : 'Connect'}</Text>
      </Pressable>
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </>
  );
}
