import { BalanceType, NetworkInfo, Props } from 'types.ts';
import { Text } from '@chakra-ui/react';
import { toHuman } from 'utils/strings.ts';
import { Balance } from '@polkadot/types/interfaces';

interface BalanceProps extends Props {
  balance: Balance;
  balanceType: BalanceType;
  network: NetworkInfo;
}

export default function BalanceText({ balance, balanceType, network }: BalanceProps) {
  if (!balance) {
    return <Text color='#666'>{`${balanceType}: 0 ${network.symbol}`}</Text>;
  }

  return (
    <>
      <Text color='#666'>{`${balanceType}: ${toHuman(balance, network.decimals)} ${network.symbol}`}</Text>
    </>
  );
}
