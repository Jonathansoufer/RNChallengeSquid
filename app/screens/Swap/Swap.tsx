import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../../navigation/RootNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { PrimaryBtn, Send as SwapArt } from '../../components';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useSquidHooks } from '@/globalState/squid';

export const Swap = ({ navigation }: RootStackScreenProps<'Swap'>) => {
  const theme = useTheme();
  const { setChains, chains } = useSquidHooks();

  React.useEffect(() => {
    (async () => {
      await setChains();
    })();
  }, []);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ backgroundColor: theme.colors.card, flex: 1 }}>
      <Animated.View
        entering={FadeInUp.duration(1000).springify()}
        style={styles.artworkStyle}>
        <SwapArt width={150} height={150} />
      </Animated.View>
      <View style={styles.innerContainer}>
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          style={styles.inputContainer}>
          <TextInput
            placeholder="To: "
            style={[
              styles.toStyle,
              {
                color: theme.colors.text,
                backgroundColor: theme.colors.background,
              },
            ]}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(600).duration(1000).springify()}>
          <PrimaryBtn
            label="Send"
            onPress={() => navigation.navigate('Home')}
          />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
