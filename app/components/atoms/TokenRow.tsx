import { CoinData } from '@/screens/Home/mocked.data';
import { Colors, Spacing } from '@/utils/constants';
import { formatAmount } from '@/utils/methods';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { PrimaryBtn } from './PrimaryBtn';

interface Props {
  token: CoinData;
  onPress: () => void;
}

export function TokenRow({ token, onPress }: Props) {
  const isConnected = false;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <FastImage source={{ uri: token.image }} style={styles.image} />
        <Text style={styles.primaryText}>{token.name}</Text>

        <PrimaryBtn
          label="Send"
          disable={!isConnected}
          onPress={onPress}
          style={{
            backgroundColor: '#2566e4',
            height: 32,
            width: 100,
            marginLeft: 'auto',
          }}
        />
      </View>
      <View>
        <Text style={styles.secondaryText}>
          {formatAmount('USD', token.current_price)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  primaryText: {
    fontSize: 16,
    fontWeight: '500',
    padding: Spacing.md,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '300',
    opacity: 0.5,
    padding: Spacing.sm,
    marginLeft: 30,
  },
  container: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Spacing.base,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  image: { width: 32, height: 32, overflow: 'hidden', borderRadius: 32 / 2 },
});
