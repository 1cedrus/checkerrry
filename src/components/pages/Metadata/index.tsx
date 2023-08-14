import ErrorCard from 'components/shared/ErrorCard.tsx';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { Camel } from 'utils/strings.ts';
import TextBox from 'components/shared/TextBox.tsx';
import Constants from 'components/pages/Metadata/Constants';
import Storage from 'components/pages/Metadata/Storage';
import { useApisContext } from 'providers/ApisProvider.tsx';
import NetworkSelector from 'components/pages/Metadata/NetworkSelector.tsx';

export default function Metadata() {
  const {
    apiSelected: { api, apiReady, network },
  } = useApisContext();

  if (!apiReady) return <ErrorCard>Error occurred (Api have not ready yet)</ErrorCard>;

  const meta = api!.runtimeMetadata.asLatest;
  const pallets = meta.pallets.sort((a, b) => a.name.localeCompare(b.name.toString()));

  return (
    <TextBox props={{ marginLeft: '0.5rem', width: '60rem', flexDirection: 'column', alignItems: 'center' }}>
      <Flex justifyContent='space-between' paddingBottom='1rem'>
        <Heading>{network.name}</Heading>
        <NetworkSelector />
      </Flex>
      <Box flexDirection='column'>
        <Accordion allowMultiple>
          {pallets.map((pallet) => (
            <AccordionItem key={pallet.toHex()}>
              <AccordionButton>
                <Heading size={'md'}>{`${Camel(pallet.name)}`}</Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Constants section={Camel(pallet.name)} />
                <Storage section={Camel(pallet.name)} />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </TextBox>
  );
}
