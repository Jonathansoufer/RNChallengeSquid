import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { RootStackScreenProps } from '../../navigation/RootNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { PrimaryBtn, Send as SwapArt } from '../../components';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { Dropdown } from '@/components/atoms/DropDown';
import { useFormattedTokens, useFormattedChains } from '@/services/sdks/squid';
import { Item } from 'react-native-picker-select';

export const Swap = ({ navigation }: RootStackScreenProps<'Swap'>) => {
  const theme = useTheme();
  const [chainId, setChainId] = React.useState('1');
  const formattedChains = useFormattedChains();
  const formattedToken = useFormattedTokens(chainId);

  const handleChainChange = (value: string) => {
    setChainId(value);
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ backgroundColor: theme.colors.card, flex: 1 }}>
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        style={styles.artworkStyle}>
        <SwapArt width={150} height={150} />
      </Animated.View>
      <View style={styles.innerContainer}>
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

        {/* <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          style={styles.inputContainer}></Animated.View> */}

        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}>
          <PrimaryBtn
            label="Swap"
            onPress={() => navigation.navigate('Home')}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropDownList: {
    fontSize: 24,
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
});
