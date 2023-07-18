// eslint-disable react-native/no-inline-styles
import { View, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import React from 'react';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { PrimaryBtn, Wallet } from '../../components';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';
import { RootStackScreenProps } from '@/navigation/RootNavigation';
import {
  WalletConnectModal,
  useWalletConnectModal,
} from '@walletconnect/modal-react-native';
import {
  projectId,
  providerMetadata,
} from '@/services/sdks/wallet-connect/config';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacing } from '@/utils';
import { useWalletConnectHooks } from '@/globalState/wallet-connect';
import { TokenRow } from '@/components/atoms/TokenRow';
import { CoinData } from '@/screens/Home/mocked.data';
import { BottomSheetComponent } from '@/components/molecules/BottomSheet';
import { Stack } from '@/components/molecules/Stack';
import mockedTokens from './mocked.data';
import { FloatingGroup } from '@/components/molecules/FloatingGroup';

export function Home({ navigation }: RootStackScreenProps<'Home'>) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const { open, provider, address, isConnected } = useWalletConnectModal();
  const { saveWalletConnectionSession } = useWalletConnectHooks();

  React.useEffect(() => {
    if (provider && address && isConnected) {
      saveWalletConnectionSession(provider, address, isConnected);
    }
  }, [provider, address, isConnected, saveWalletConnectionSession]);

  const renderItem = ({ item }: { item: CoinData }) => {
    return <TokenRow token={item} onPress={onRowDisabledPress} />;
  };

  const onRowDisabledPress = () => {
    Toast.show({
      type: 'info',
      text1: t('send.toasts.title'),
      text2: t('send.toasts.info.description'),
    });
  };

  const handleWalletBtnPress = () => {
    if (!isConnected) {
      navigation.navigate('Swap');
    } else {
      open();
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.colors.card,
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        style={styles.artworkStyle}>
        <Wallet width={300} height={300} />
      </Animated.View>
      <BottomSheetComponent
        snapPoints={['50%', '90%']}
        scrollViewChildren={
          <Stack space={Spacing.base} padding={Spacing.lg}>
            <FlashList
              data={mockedTokens}
              renderItem={renderItem}
              // estimatedListSize={(200, 30)}
              estimatedItemSize={100}
              keyExtractor={item => String(item.id)}
            />
          </Stack>
        }
      />
      <FloatingGroup>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}>
          <PrimaryBtn
            label={
              isConnected
                ? t('send.btn.view-account')
                : t('send.btn.connect-wallet')
            }
            style={styles.primaryBtn}
            onPress={handleWalletBtnPress}
          />
        </Animated.View>
      </FloatingGroup>
      <View style={styles.innerContainer}>
        <WalletConnectModal
          projectId={projectId}
          providerMetadata={providerMetadata}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  animatedDescription: {
    opacity: 0.5,
    marginTop: 16,
    fontSize: 16,
  },
  primaryBtn: { width: '90%', alignSelf: 'center' },
  innerContainer: { alignItems: 'center', gap: 16, marginTop: 32 },
  animatedTitle: { fontSize: 40, fontWeight: '800' },
  animatedView: { alignItems: 'center', bottom: 20 },
  artworkStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 32,
  },
  padding: { padding: 24 },
  inputContainer: { position: 'relative', width: '90%' },
  toStyle: {
    fontSize: 16,
    fontWeight: '500',

    paddingLeft: 48,
    paddingRight: 12,
    height: 48,
    borderRadius: 12,

    width: '100%',
  },
});
