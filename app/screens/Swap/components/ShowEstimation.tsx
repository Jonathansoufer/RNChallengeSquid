import { Spacing } from '@/utils';
import { Estimate } from '@0xsquid/sdk/dist/types';
import { Box, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

interface ShowEstimationProps {
  estimation: Estimate | undefined;
}

export const ShowEstimation = ({ estimation }: ShowEstimationProps) => {
  const { t } = useTranslation();
  if (!estimation) {
    return;
  }
  const { estimatedRouteDuration, feeCosts, gasCosts } = estimation;

  // const feeCostsSum = feeCosts.reduce(caculateSumOfCosts({ amountUSD }), 0);
  // const gasCostsSum = gasCosts.reduce(caculateSumOfCosts, 0).amountUSD;

  return (
    <Box alignItems="left" style={styles.card}>
      <Text fontSize="sm" fontWeight="bold">
        {t('swap.labels.estimation')}
      </Text>
      <Text fontSize="sm">
        {t('swap.labels.routeDuration')}: {estimatedRouteDuration}
      </Text>
      {/* <Text fontSize="sm" fontWeight="bold">
        `{t('globals.feeCosts')}: {feeCostsSum}`
      </Text>
      <Text fontSize="sm" fontWeight="bold">
        {t('globals.gasCosts')}: {gasCostsSum}`
      </Text> */}
    </Box>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    width: '100%',
  },
});
