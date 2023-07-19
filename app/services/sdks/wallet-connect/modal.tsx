import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import { Pressable, Text } from 'react-native';

import { projectId, providerMetadata } from './config';

export function WCModal() {
  const { open, isConnected, address } = useWalletConnectModal();
  return (
    <>
      <Pressable onPress={() => open()}>
        <Text>{isConnected ? address : 'Connect'}</Text>
      </Pressable>
      <WalletConnectModal
        projectId={projectId}
        providerMetadata={providerMetadata}
      />
    </>
  );
}
