import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useAddressContext } from '../providers/AddressProvider.tsx';
import { FormEvent, useState } from 'react';

export default function AccountAddressInput() {
  const [address, setAddress] = useState<string>('');
  const { setAddress: setAddressContext } = useAddressContext();

  const handleClick = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    setAddressContext(address);
  };

  return (
    <InputGroup as='form' onSubmit={handleClick} size='md' my='1rem' boxShadow='5px 5px gray' width='40rem'>
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder={'Address'}
        variant='outline'
        textAlign='center'
        borderRadius='none'
        bgColor='white'
      />
      <InputRightElement width='4.5rem'>
        <Button type='submit' size='sm' mr='0.25rem' borderRadius='none'>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
