import { Box, Flex, Heading } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { Camel } from 'utils/strings.ts';
import { ConstValue } from './index.tsx';
import { useState } from 'react';
import TextBox from 'components/shared/TextBox.tsx';
import Button from 'components/shared/Button.tsx';
import { useApisContext } from 'providers/ApisProvider.tsx';

export default function Description({ method, section, meta }: ConstValue) {
  const {
    apiSelected: { api },
  } = useApisContext();
  const [value, setValue] = useState<string>();

  // apiReady is being checked by parent component
  const handleClick = () => {
    setValue(api!.consts[section] ? api!.consts[section][method].toString() : '');
  };

  const removeValue = () => {
    setValue('');
  };

  return (
    <Box>
      <Heading size='sm'>{method}</Heading>
      <Flex flexDirection='column' marginLeft='1rem' gap='0.25rem'>
        <ReactMarkdown>{`Description: ${meta.docs.join(' ') || 'None'}`}</ReactMarkdown>
        <ReactMarkdown>{`API Endpoint: \`api.const.${Camel(section)}.${Camel(method)}\``}</ReactMarkdown>
        <Box display='flex' gap='0.5rem'>
          <Button onClick={handleClick}>Try now</Button>
          {value && <Button onClick={removeValue}>Remove</Button>}
        </Box>
        {value && (
          <TextBox
            props={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              maxHeight: '30rem',
              overflow: 'scroll',
            }}>
            <pre>{value}</pre>
          </TextBox>
        )}
      </Flex>
    </Box>
  );
}
