import AccountAddressInput from './AccountAddressInput.tsx';
import AccountCard from 'components/pages/Balances/AccountCard.tsx';
import AccountBalance from 'components/pages/Balances/AccountBalance.tsx';
import { useParams } from 'react-router-dom';
import { useAddressContext } from 'providers/AddressProvider.tsx';
import { useEffect } from 'react';
import { Flex } from '@chakra-ui/react';

export default function Balances() {
  const { address } = useParams();
  const { setAddress } = useAddressContext();

  useEffect(() => {
    if (!address) return;

    setAddress(address);
  }, [address]);

  return (
    <Flex flex='1' flexDirection='column' alignItems='center' justifyContent='center' gap='1rem'>
      <AccountAddressInput />
      <AccountCard />
      <AccountBalance />
    </Flex>
  );
}
