import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { Camel } from '../../../../utils/strings.ts';
import { ConstValue } from './index.tsx';
import { useState } from 'react';
import useApi from '../../../../hooks/useApi.ts';
import TextBox from '../../../shared/TextBox.tsx';

export default function Description({ method, section, meta }: ConstValue) {
  const { api } = useApi('polkadot');
  const [value, setValue] = useState<string>();

  const handleClick = () => {
    setValue(api.consts[section] ? api.consts[section][method].toString() : '');
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
          <Button
            onClick={handleClick}
            borderRadius='none'
            width='5rem'
            height='1.5rem'
            boxShadow='2px 2px gray'
            border='solid 1px gray'>
            Try now
          </Button>
          {value && (
            <Button
              onClick={removeValue}
              borderRadius='none'
              width='5rem'
              height='1.5rem'
              boxShadow='2px 2px gray'
              border='solid 1px gray'>
              Remove
            </Button>
          )}
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
