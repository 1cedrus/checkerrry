import { Box } from '@chakra-ui/react';
import Button from 'components/shared/Button.tsx';
import TextBox from 'components/shared/TextBox.tsx';
import { useState } from 'react';
import useApi from 'hooks/useApi.ts';

interface NoParamsProps {
  section: string;
  method: string;
}

export default function NoParams({ section, method }: NoParamsProps) {
  const { api } = useApi('polkadot');
  const [value, setValue] = useState<string>('');

  const handleClick = async () => {
    const value = await api.query[section][method]();
    setValue(JSON.stringify(value.toJSON(), null, 2));
  };

  const removeValue = () => {
    setValue('');
  };

  return (
    <>
      <Box display='flex' gap='0.5rem'>
        <Button onClick={handleClick}>Try now</Button>
        {value && <Button onClick={removeValue}>Remove</Button>}
      </Box>
      {value && (
        <TextBox
          props={{
            width: '100%',
            maxHeight: '30rem',
            overflow: 'scroll',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <pre>{value}</pre>
        </TextBox>
      )}
    </>
  );
}
