import { Flex } from '@chakra-ui/react';
import AccountAddressInput from 'components/shared/AccountAddressInput.tsx';
import AccountCard from 'components/shared/AccountCard.tsx';
import AccountBalance from 'components/shared/AccountBalance.tsx';

export default function MainLayout() {
  return (
    <Flex flexDirection='column' alignItems='center' gap='1rem' bgColor='#FFE4C4' height='100vh'>
      <AccountAddressInput />
      <AccountCard />
      <AccountBalance />
    </Flex>
  );
}
