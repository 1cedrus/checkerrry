import { Flex } from '@chakra-ui/react';
import ErrorCard from '../shared/ErrorCard.tsx';

export default function Errors() {
  return (
    <Flex justifyContent='center' marginTop='2rem'>
      <ErrorCard description={'Error occurred (Invalid address)'} />
    </Flex>
  );
}
