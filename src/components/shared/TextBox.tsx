import { Box, BoxProps } from '@chakra-ui/react';
import { Props } from 'types.ts';

interface TextBoxProps extends Props {
  props?: BoxProps;
}

export default function TextBox({ children, props }: TextBoxProps) {
  return (
    <Box width='40rem' padding='1.5rem' boxShadow='5px 5px gray' border='solid 1px gray' {...props}>
      {children}
    </Box>
  );
}
