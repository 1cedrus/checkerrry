import { Flex, Heading } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { Camel, isEmptyArray } from 'utils/strings.ts';
import NoParams from 'components/pages/Metadata/Storage/NoParams.tsx';
import Params from 'components/pages/Metadata/Storage/Params.tsx';
import { StorageValueBase } from 'types.ts';

export default function Description({ method, section, meta, params }: StorageValueBase) {
  return (
    <>
      <Heading size='sm'>{method}</Heading>
      <Flex flexDirection='column' marginLeft='1rem' gap='0.25rem'>
        <ReactMarkdown>{`Description: ${meta.docs.join(' ')}`}</ReactMarkdown>
        <ReactMarkdown>{`API Endpoint: \`api.query.${Camel(section)}.${Camel(method)}\``}</ReactMarkdown>
        {isEmptyArray(params) ? (
          <NoParams section={section} method={method} />
        ) : (
          <Params params={params} section={section} method={method} />
        )}
      </Flex>
    </>
  );
}
