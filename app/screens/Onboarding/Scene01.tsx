import { View, StyleSheet } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '../../navigation/RootNavigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { INTRO_SCREEN_01 } from '../../utils/constantsText';
import { useTheme } from '@react-navigation/native';
import { PrimaryBtn, ScreenIndicators, Artwork1 } from '../../components';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export const Scene01 = ({ navigation }: RootStackScreenProps<'Scene01'>) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    // eslint-disable-next-line react-native/no-inline-styles
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
        <Artwork1 width={300} height={300} />
      </Animated.View>
      <View style={styles.padding}>
        <Animated.Text
          entering={FadeInDown.duration(1000).springify()}
          style={[styles.animatedTitle, { color: theme.colors.text }]}>
          {INTRO_SCREEN_01.title}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(100).duration(1000).springify()}
          style={[styles.animatedDescription, { color: theme.colors.text }]}>
          {INTRO_SCREEN_01.description}
        </Animated.Text>
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}>
          <ScreenIndicators count={4} activeIndex={0} />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={styles.animatedView}>
          <PrimaryBtn
            label="Next"
            onPress={() => navigation.replace('Scene02')}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  animatedDescription: {
    opacity: 0.5,
    marginTop: 16,
    fontSize: 16,
  },
  animatedTitle: { fontSize: 40, fontWeight: '800' },
  animatedView: { alignItems: 'flex-end' },
  artworkStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  padding: { padding: 24 },
});
