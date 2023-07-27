import { Avatar, Card, CardBody, Heading, Text, Spinner, Box, Flex } from '@chakra-ui/react';
import { useApisContext } from '../providers/ApisProvider.tsx';
import { SUPPORTED_NETWORKS } from '../../utils/networks.ts';
import { useAddressContext } from '../providers/AddressProvider.tsx';
import { useState } from 'react';
import { useAsync, useToggle } from 'react-use';
import { isValidAddressPolkadotAddress } from '../../utils/validates.ts';
import { Balance } from '@polkadot/types/interfaces';

export const toHuman = (value: Balance, decimal: number) => {
  let balanceString = value.toString();

  let redundant = 0;

  if (balanceString.length > decimal) {
    redundant = balanceString.length - decimal;
    balanceString = balanceString.slice(0, decimal);
  }

  return Number(balanceString) / Math.pow(10, decimal - redundant);
};

export default function AccountBalance() {
  const apis = useApisContext();
  const { address } = useAddressContext();
  const [balances, setBalances] = useState<Object>({});
  const [error, setError] = useToggle(false);

  useAsync(async () => {
    if (!address || !apis) return;

    setError(false);
    setBalances({});

    if (!isValidAddressPolkadotAddress(address)) {
      setError(true);
      return;
    }

    apis.forEach(({ api, network }) => {
      // @ts-ignore
      api.query.system.account(address).then(({ data: { free: freeBalance } }) => {
        setBalances((current) => ({ ...current, [network.id]: freeBalance }));
      });
    });
  }, [address, apis]);

  if (error) {
    return <Text>Error occurred (Invalid address)</Text>;
  }

  if (!address) return;

  return (
    <Box>
      {SUPPORTED_NETWORKS.map((network) => (
        <Card
          key={network.id}
          display='flex'
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          px='0.5rem'
          width='40rem'
          height='3rem'
          marginBottom='1rem'
          borderRadius='none'
          boxShadow='3px 3px gray'
          border='solid 1px gray'>
          <Flex alignItems='center' gap='0.5rem' width='15rem'>
            {(balances as any)[network.id] ? (
              <Avatar src={network.logo} size='sm' />
            ) : (
              <Spinner color='gray' size='lg' />
            )}
            <Heading size='sm' color='#333'>
              {network.name}
            </Heading>
          </Flex>

          <CardBody>
            {(balances as any)[network.id] && (
              <Text color='#666'>{`Free Balance: ${toHuman((balances as any)[network.id], network.decimals)} ${
                network.symbol
              }`}</Text>
            )}
          </CardBody>
        </Card>
      ))}
    </Box>
  );
}
