// eslint-disable react-native/no-inline-styles
import {
  CustomSelect,
  FloatingGroup,
  PrimaryBtn,
  Swap as SwapArt,
} from '@/components';
import { useMetamaskSDK } from '@/services/sdk/metamask';
import { useFormattedChains } from '@/services/sdk/squid';
import { Colors, Spacing, log } from '@/utils';
import { useTheme } from '@react-navigation/native';
import { debounce } from 'lodash';
import { Box, HStack, Input, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../navigation/RootNavigation';
import { ShowEstimation } from './components/ShowEstimation';
import { useRoute } from './hooks/use-route';
import { useSwapMethods } from './hooks/use-swap-methods';
export const Swap = ({ navigation }: RootStackScreenProps<'Swap'>) => {
  const theme = useTheme();
  const { executeSwap } = useRoute();
  const { signer, getConnectedToMetamask } = useMetamaskSDK();
  const [isLoading, setIsLoading] = useState(false);
  const {
    getSwapEstimation,
    handleFromChainChange,
    handleToChainChange,
    currentEstimation,
    swapParams,
    setSwapParams,
    setIsReadyToSwap,
    tokens,
  } = useSwapMethods();

  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const formattedChains = useFormattedChains();

  const handleSwapBtnPress = async () => {
    setIsLoading(true);

    await getConnectedToMetamask();

    const txReceipt = await executeSwap(swapParams, signer);
    log('txReceipt', txReceipt);

    setIsLoading(false);
  };

  useEffect(() => {
    if (
      swapParams.fromChain !== 0 &&
      swapParams.toChain !== 0 &&
      swapParams.fromToken !== '' &&
      swapParams.toToken !== '' &&
      swapParams.fromAmount !== '' &&
      swapParams.toAddress
    ) {
      setIsReadyToSwap(true);
      getSwapEstimation();
      log('ready to swap', swapParams);
    }
  }, [swapParams]);

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        style={styles.artworkStyle}>
        <SwapArt width={150} height={150} />
      </Animated.View>
      <View style={styles.card}>
        <Box alignItems="center" style={{ margin: 10 }}>
          {/* TODO: add debounced input for amount and format it */}
          <Input
            mx="3"
            placeholder={t('globals.amountInUSD')}
            w="97%"
            onChangeText={debounce((text: string) => {
              setSwapParams({
                ...swapParams,
                fromAmount: text,
              });
            }, 1000)}
          />
        </Box>
        <HStack space={1} justifyContent="center" marginBottom={Spacing.base}>
          <CustomSelect
            label={t('swap.labels.sourceChain')}
            selectedValue={swapParams.fromChain}
            minWidth="180"
            accessibilityLabel={t('swap.placeholders.selectChainFrom')}
            placeholder={t('swap.placeholders.selectChainFrom')}
            items={formattedChains}
            onValueChange={cId => handleFromChainChange(cId)}
          />
          <CustomSelect
            label={t('swap.labels.sourceToken')}
            selectedValue={swapParams.fromToken}
            minWidth="180"
            accessibilityLabel={t('swap.placeholders.selectTokenFrom')}
            placeholder={t('swap.placeholders.selectTokenFrom')}
            items={tokens.fromTokens}
            onValueChange={fromTokenAddress =>
              setSwapParams({
                ...swapParams,
                fromToken: fromTokenAddress,
              })
            }
          />
        </HStack>

        <HStack space={1} justifyContent="center">
          <CustomSelect
            label={t('swap.labels.destinationChain')}
            selectedValue={swapParams.toChain}
            minWidth="180"
            accessibilityLabel={t('swap.placeholders.selectChainTo')}
            placeholder={t('swap.placeholders.selectChainTo')}
            items={formattedChains}
            onValueChange={c => handleToChainChange(c)}
          />
          <CustomSelect
            label={t('swap.labels.destinationToken')}
            selectedValue={swapParams.toToken}
            minWidth="180"
            accessibilityLabel={t('swap.placeholders.selectTokenTo')}
            placeholder={t('swap.placeholders.selectTokenTo')}
            items={tokens.toTokens}
            onValueChange={toTokenAddress =>
              setSwapParams({
                ...swapParams,
                toToken: toTokenAddress,
              })
            }
          />
        </HStack>
        <Box alignItems="center" style={{ margin: 10 }}>
          {/* TODO: add debounced input for wallet */}
          <Input
            mx="3"
            placeholder={t('swap.destinationWallet')}
            w="97%"
            onChangeText={debounce((text: string) => {
              setSwapParams({
                ...swapParams,
                toAddress: text,
              });
            }, 1000)}
          />
          <ShowEstimation estimation={currentEstimation} />
        </Box>
      </View>

      <FloatingGroup>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}>
          <PrimaryBtn
            label={t('swap.btn.swap')}
            style={styles.primaryBtn}
            onPress={handleSwapBtnPress}
            disable={isLoading}
          />
        </Animated.View>
      </FloatingGroup>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.xl,
    marginHorizontal: Spacing.base,
    paddingHorizontal: Spacing.base,
    borderRadius: 12,
  },
  dropDownList: {
    fontSize: 24,
    fontWeight: '500',
  },
  primaryBtn: { width: '90%', alignSelf: 'center' },
  animatedDescription: {
    opacity: 0.5,
    marginTop: 16,
    fontSize: 16,
  },
  innerContainer: { alignItems: 'center', gap: 16, marginTop: 32 },
  animatedTitle: { fontSize: 40, fontWeight: '800' },
  animatedView: { alignItems: 'flex-end' },
  artworkStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
