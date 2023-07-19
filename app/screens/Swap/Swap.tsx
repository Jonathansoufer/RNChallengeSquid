// eslint-disable react-native/no-inline-styles
import {
  CustomSelect,
  FloatingGroup,
  PrimaryBtn,
  Swap as SwapArt,
} from '@/components';
import { useFormattedChains, useFormattedTokens } from '@/services/sdks/squid';
import { Colors, Spacing } from '@/utils';
import { useWalletProvider } from '@/utils/hooks/use-wallet-provider';
import { useTheme } from '@react-navigation/native';
import { Box, HStack, Input, View } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Item } from 'react-native-picker-select';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../navigation/RootNavigation';
import { useRoute } from './hooks/use-route';

interface IChain {
  chainId: string;
  tokenAddress: string;
  tokens: Array<Item>;
  walletAddress?: string;
}

export const Swap = ({ navigation }: RootStackScreenProps<'Swap'>) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { connect } = useWalletProvider();
  const { t } = useTranslation();
  const { getEstimation, executeSwap } = useRoute();
  const [from, setFrom] = React.useState<IChain>({
    chainId: '1',
    tokenAddress: '',
    tokens: [],
  });
  const [to, setTo] = React.useState<IChain>({
    chainId: '1',
    tokenAddress: '',
    tokens: [],
    walletAddress: '',
  });

  const formattedChains = useFormattedChains();
  const { filterTokens, formattedTokens } = useFormattedTokens();

  const handleSwapBtnPress = async () => {
    await getEstimation({
      fromChain: Number(from.chainId),
      fromToken: from.tokenAddress,
      fromAmount: '100',
      toChain: Number(to.chainId),
      toToken: to.tokenAddress,
      toAddress: to.walletAddress!,
      slippage: 1,
      enableForecall: false,
      quoteOnly: true,
    });
  };

  const handleFromChainChange = (chainFromId: string) => {
    filterTokens(chainFromId);
    setFrom({
      ...from,
      chainId: chainFromId,
      tokens: formattedTokens,
    });
  };

  const handleToChainChange = (chainToId: string) => {
    filterTokens(chainToId);
    setTo({
      ...to,
      chainId: chainToId,
      tokens: formattedTokens,
    });
  };

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
          <Input mx="3" placeholder={t('globals.amount')} w="100%" />
        </Box>
        <HStack space={1} justifyContent="center" marginBottom={Spacing.base}>
          <CustomSelect
            label={t('swap.labels.sourceChain')}
            selectedValue={from.chainId}
            minWidth="180"
            accessibilityLabel={t('swap.placeholders.selectChainFrom')}
            placeholder={t('swap.placeholders.selectChainFrom')}
            items={formattedChains}
            onValueChange={d => handleFromChainChange(d)}
          />
          <CustomSelect
            label={t('swap.labels.sourceToken')}
            selectedValue={from.tokenAddress}
            minWidth="180"
            accessibilityLabel={t('swap.placeholders.selectTokenFrom')}
            placeholder={t('swap.placeholders.selectTokenFrom')}
            items={from.tokens}
            onValueChange={tokenFromAddress =>
              setFrom({
                ...from,
                tokenAddress: tokenFromAddress,
                tokens: formattedTokens,
              })
            }
          />
        </HStack>

        <HStack space={1} justifyContent="center">
          <CustomSelect
            label={t('swap.labels.destinationChain')}
            selectedValue={to.chainId}
            minWidth="180"
            accessibilityLabel={t('swap.placeholders.selectChainTo')}
            placeholder={t('swap.placeholders.selectChainTo')}
            items={formattedChains}
            disabled={from.tokenAddress === ''}
            onValueChange={c => handleToChainChange(c)}
          />
          <CustomSelect
            label={t('swap.labels.destinationToken')}
            selectedValue={to.tokenAddress}
            minWidth="180"
            accessibilityLabel={t('swap.placeholders.selectTokenTo')}
            placeholder={t('swap.placeholders.selectTokenTo')}
            items={to.tokens}
            disabled={from.tokenAddress === ''}
            onValueChange={tokenToAddress =>
              setTo({ ...to, tokenAddress: tokenToAddress })
            }
          />
        </HStack>
        <Box alignItems="center" style={{ margin: 10 }}>
          <Input mx="3" placeholder={t('swap.destinationWallet')} w="100%" />
        </Box>
      </View>
      <FloatingGroup>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}>
          <PrimaryBtn
            label={t('swap.btn.swap')}
            style={styles.primaryBtn}
            onPress={handleSwapBtnPress}
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
