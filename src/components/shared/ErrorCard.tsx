import { Box } from '@chakra-ui/react';
import { Props } from 'types.ts';

export default function ErrorCard({ children }: Props) {
  return (
    <Box width='40rem' padding='1.5rem' boxShadow='5px 5px gray' border='solid 1px gray' textAlign='center'>
      {children}
    </Box>
  );
}
