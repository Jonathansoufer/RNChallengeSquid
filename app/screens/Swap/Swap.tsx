// eslint-disable react-native/no-inline-styles
import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../navigation/RootNavigation';
import { Spacing } from '@/utils';
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { PrimaryBtn, Send as SwapArt } from '../../components';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { Dropdown } from '@/components/atoms/DropDown';
import { useFormattedTokens, useFormattedChains } from '@/services/sdks/squid';
import { Stack } from '@/components/molecules/Stack';

export const Swap = ({ navigation }: RootStackScreenProps<'Swap'>) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const [chainId, setChainId] = React.useState('1');

  const formattedChains = useFormattedChains();
  const formattedToken = useFormattedTokens(chainId);

  const handleChainChange = (value: string) => {
    setChainId(value);
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
        <SwapArt width={150} height={150} />
      </Animated.View>
      <Stack
        style={styles.innerContainer}
        space={Spacing.base}
        padding={Spacing.lg}>
        <Text style={styles.animatedDescription}>{t('swap.from')}</Text>
        <View style={styles.row}>
          <Dropdown
            list={formattedChains}
            onChange={handleChainChange}
            style={styles.dropDownList}
          />
          <Dropdown
            list={formattedToken}
            onChange={() => {}}
            style={styles.dropDownList}
          />
        </View>
        <Text style={styles.animatedDescription}>{t('swap.to')}</Text>
        <View style={styles.row}>
          <Dropdown
            list={formattedChains}
            onChange={handleChainChange}
            style={styles.dropDownList}
          />
          <Dropdown
            list={formattedToken}
            onChange={() => {}}
            style={styles.dropDownList}
          />
        </View>
        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}>
          <PrimaryBtn
            label="Swap"
            onPress={() => navigation.navigate('Home')}
          />
        </Animated.View>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownList: {
    fontSize: 24,
    fontWeight: '500',
  },
  animatedDescription: {
    opacity: 0.5,
    marginTop: 16,
    fontSize: 16,
  },
  innerContainer: { alignItems: 'center', gap: 16, marginTop: 32 },
  animatedTitle: { fontSize: 40, fontWeight: '800' },
  animatedView: { alignItems: 'flex-end' },
  artworkStyle: { alignItems: 'center', flex: 1, justifyContent: 'center' },
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
