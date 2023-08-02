import { Box } from '@chakra-ui/react';
import { Props } from 'types.ts';

interface ErrorCardProps extends Props {
  description: string;
}

export default function ErrorCard({ description }: ErrorCardProps) {
  return (
    <Box width='40rem' padding='1.5rem' boxShadow='5px 5px gray' border='solid 1px gray' textAlign='center'>
      {description}
    </Box>
  );
}
