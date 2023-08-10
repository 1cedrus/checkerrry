import { Button as ButtonChakra, ButtonProps as ButtonChakraProps } from '@chakra-ui/react';
import { Props } from 'types.ts';

interface ButtonProps extends Props {
  onClick: () => void;
  props?: ButtonChakraProps;
}

export default function Button({ onClick, children, props }: ButtonProps) {
  return (
    <ButtonChakra
      onClick={onClick}
      borderRadius='none'
      width='5rem'
      height='1.5rem'
      boxShadow='2px 2px gray'
      border='solid 1px gray'
      {...props}>
      {children}
    </ButtonChakra>
  );
}
