import { Balance } from '@polkadot/types/interfaces';

export const toHuman = (value: Balance, decimal: number) => {
  if (!value) return 0;
  let balanceString = value.toString();

  let redundant = 0;

  if (balanceString.length > decimal) {
    redundant = balanceString.length - decimal;
    balanceString = balanceString.slice(0, decimal);
  }

  return Number(balanceString) / Math.pow(10, decimal - redundant);
};
