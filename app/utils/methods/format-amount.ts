import BigNumber from 'bignumber.js';
import {
  fiatCurrencySymbols,
  getFiatCurrencySymbol,
} from './get-fiat-currency-symbol';

export function isFiat(ticker: string) {
  return fiatCurrencySymbols[ticker.toUpperCase()];
}

type Numberish = string | number | BigNumber;

// In order to allow only one BigNumber library to be used, we need to convert ethers.BigNumber to BigNumber so that we
// can use BigNumber methods on it which differs from the one presented in ethers.BigNumber library.

export const convertAmount = (amount: Numberish) =>
  BigNumber.isBigNumber(amount) ? amount : new BigNumber(amount);

export function getTwentyFourHourChange(
  percentageChange: Numberish,
  amount: Numberish,
) {
  const parsedPercentageChange = convertAmount(percentageChange);
  const parsedAmount = convertAmount(amount);
  const oldAmount = parsedAmount.div(parsedPercentageChange.plus(1).div(100));
  return parsedAmount.minus(oldAmount).toFormat(4);
}

export function formatNumber(amount: Numberish) {
  const parsed = convertAmount(amount);
  return parsed.decimalPlaces(4).toString();
}

export function formatAmount(ticker: string, amount: Numberish) {
  const parsed = convertAmount(amount);

  if (isFiat(ticker)) {
    const fixedAmount = parsed.isNaN() ? '0.00' : parsed.toFormat(2);
    return `${getFiatCurrencySymbol(ticker)}${fixedAmount}`;
  }

  return `${formatNumber(parsed)} ${ticker}`;
}
