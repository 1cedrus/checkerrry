import { Props } from '../../types.ts';
import TextBox from './TextBox.tsx';
import { Box, BoxProps, Spinner } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

interface LoadingToastProps extends Props {
  props?: BoxProps;
  done?: boolean;
}

export default function LoadingToast({ children, done, props }: LoadingToastProps) {
  return (
    <TextBox
      props={{
        width: '15rem',
        padding: '0.5rem',
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        paddingLeft: '1rem',
        height: '3rem',
        bgColor: 'white',
      }}
      {...props}>
      <Box width='1.5rem'>{done ? <CheckIcon /> : <Spinner color='gray' size='md' />}</Box>
      {children}
    </TextBox>
  );
}
