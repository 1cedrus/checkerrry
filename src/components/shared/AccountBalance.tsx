import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useApisContext } from 'components/providers/ApisProvider.tsx';
import { SUPPORTED_NETWORKS } from 'utils/networks.ts';
import { useAddressContext } from 'components/providers/AddressProvider.tsx';
import { useState } from 'react';
import { useAsync } from 'react-use';
import { isValidAddressPolkadotAddress } from 'utils/validates.ts';
import BalanceText from 'components/shared/Balance.tsx';
import { BalanceType } from 'types.ts';

export default function AccountBalance() {
  const apis = useApisContext();
  const { address } = useAddressContext();
  const [balances, setBalances] = useState<Object>({});

  useAsync(async () => {
    if (!address || !apis) return;

    setBalances({});

    apis.forEach(({ api, network }) => {
      // @ts-ignore
      api.query.system.account(address).then(({ data: balance }) => {
        setBalances((current) => ({ ...current, [network.id]: balance }));
      });
    });
  }, [address, apis]);

  if (!address) return;

  if (!isValidAddressPolkadotAddress(address)) {
    return <Text>Error occurred (Invalid address)</Text>;
  }

  return (
    <Box>
      <Accordion allowMultiple>
        {SUPPORTED_NETWORKS.map((network) => (
          <AccordionItem key={network.id} width='40rem'>
            <AccordionButton>
              <Card
                display='flex'
                flexDirection='row'
                alignItems='center'
                justifyContent='space-between'
                px='0.5rem'
                height='3rem'
                width='40rem'
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

                <CardBody textAlign='left'>
                  {(balances as any)[network.id] && (
                    <BalanceText
                      balance={(balances as any)[network.id].free}
                      balanceType={BalanceType.Free}
                      network={network}
                    />
                  )}
                </CardBody>
                <AccordionIcon />
              </Card>
            </AccordionButton>
            <AccordionPanel>
              {(balances as any)[network.id] && (
                <>
                  <BalanceText
                    balance={(balances as any)[network.id].reserved}
                    balanceType={BalanceType.Reserved}
                    network={network}
                  />
                  <BalanceText
                    balance={(balances as any)[network.id].lockedBalance}
                    balanceType={BalanceType.Locked}
                    network={network}
                  />
                  <BalanceText
                    balance={(balances as any)[network.id].frozen}
                    balanceType={BalanceType.Frozen}
                    network={network}
                  />
                </>
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
