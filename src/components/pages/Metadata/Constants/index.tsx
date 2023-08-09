import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading } from '@chakra-ui/react';
import { Props } from 'types.ts';
import type { ConstantCodec } from '@polkadot/types/metadata/decorate/types';
import type { PalletConstantMetadataLatest } from '@polkadot/types/interfaces';
import useApi from '../../../../hooks/useApi.ts';
import { useState } from 'react';
import Description from './Description.tsx';

export interface ConstValueBase {
  method: string;
  section: string;
}

export interface ConstValue extends ConstValueBase {
  meta: PalletConstantMetadataLatest;
}

interface ConstantsProps extends Props {
  section: string;
}

export default function Constants({ section }: ConstantsProps) {
  const { api } = useApi('polkadot');

  // TODO: whether use useState or useMemo here
  const [value] = useState<ConstValue[]>(() => {
    const methods = Object.keys(api.consts[section] || {}).sort((a, b) => a.localeCompare(b));

    return methods.map((method) => ({
      method,
      section,
      meta: (api.consts[section][method] as ConstantCodec).meta,
    }));
  });

  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <Heading size='sm'>Constants</Heading>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel display='flex' flexDirection='column' gap='1rem'>
          {value.map((props) => (
            <Description key={props.meta.name.toString()} {...props} />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
