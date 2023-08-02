import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccountAddressInput() {
  const [address, setAddress] = useState<string>('');
  const navigate = useNavigate();

  const handleClick = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    navigate(`/balances/${address}`);
  };

  return (
    <InputGroup as='form' onSubmit={handleClick} size='md' boxShadow='5px 5px gray' width='40rem'>
      <Input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder={'Address'}
        variant='outline'
        textAlign='center'
        borderRadius='none'
        border='1px solid gray'
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
