import { Flex } from '@chakra-ui/react';
import NavigateButton from 'components/layouts/NavigateButton.tsx';

import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <Flex justifyContent='center' paddingY={'0.5rem'}>
      <Outlet />
      <NavigateButton />
    </Flex>
  );
}
