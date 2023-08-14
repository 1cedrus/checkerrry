import type { StorageEntryTypeLatest } from '@polkadot/types/interfaces';
import type { Registry } from '@polkadot/types/types';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Heading } from '@chakra-ui/react';
import { ParamsType, Props, StorageValueBase, TypeDefExt } from 'types.ts';
import { TypeDefInfo } from '@polkadot/types/types';
import { getTypeDef } from '@polkadot/types';
import { getSiName } from '@polkadot/types/metadata/util';
import { useState } from 'react';
import Description from 'components/pages/Metadata/Storage/Description.tsx';
import { useApisContext } from 'providers/ApisProvider.tsx';

function checkIterable(registry: Registry, type: StorageEntryTypeLatest): boolean {
  if (type.isPlain) {
    return true;
  }

  const { hashers, key } = type.asMap;

  if (hashers.length === 1) {
    return registry.lookup.getTypeDef(key).info !== TypeDefInfo.Option;
  }

  const keys = registry.lookup.getSiType(key).def.asTuple;

  return registry.lookup.getTypeDef(keys[keys.length - 1]).info !== TypeDefInfo.Option;
}

function expandParams(registry: Registry, st: StorageEntryTypeLatest, isIterable: boolean): ParamsType {
  let types: string[] = [];

  if (st.isMap) {
    const { hashers, key } = st.asMap;

    types =
      hashers.length === 1
        ? [getSiName(registry.lookup, key)]
        : registry.lookup.getSiType(key).def.asTuple.map((k) => getSiName(registry.lookup, k));
  }

  return types.map((str, index) => {
    let name: string | undefined;
    let type: TypeDefExt;

    if (isIterable && index === types.length - 1) {
      // name = 'entryKey';
      type = getTypeDef(`Option<${str}>`);
      type.withOptionActive = true;
    } else {
      type = getTypeDef(str);
    }

    return { name, type };
  });
}

interface StorageProps extends Props {
  section: string;
}

export default function Storage({ section }: StorageProps) {
  const {
    apiSelected: { api },
  } = useApisContext();

  // apiReady is being checked by parent component
  // TODO: whether use useState or useMemo here
  const [value] = useState<StorageValueBase[]>(() => {
    const methods = Object.keys(api!.query[section] || {}).sort((a, b) => a.localeCompare(b));

    return methods.map((method) => ({
      method,
      section,
      meta: api!.query[section][method].creator.meta,
      params: expandParams(
        api!.registry,
        api!.query[section][method].creator.meta.type,
        checkIterable(api!.registry, api!.query[section][method].creator.meta.type),
      ),
    }));
  });

  return (
    <Accordion allowMultiple>
      <AccordionItem>
        <AccordionButton>
          <Heading size='sm'>Storage</Heading>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel display='flex' flexDirection='column' gap='1rem'>
          {value.map((data) => (
            <Description key={data.meta.name.toString()} {...data} />
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
