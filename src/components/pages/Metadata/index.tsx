import useApi from 'hooks/useApi.ts';
import ErrorCard from 'components/shared/ErrorCard.tsx';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from '@chakra-ui/react';
import { Camel } from 'utils/strings.ts';
import TextBox from 'components/shared/TextBox.tsx';
import Constants from './Constants.tsx';
// import Storage from './Storage.tsx';

export default function Metadata() {
  const { api, apiReady, network } = useApi('polkadot');

  if (!apiReady) return <ErrorCard>Error occurred (Api have not ready yet)</ErrorCard>;

  const meta = api.runtimeMetadata.asLatest;
  const pallets = meta.pallets.sort((a, b) => a.name.localeCompare(b.name.toString()));

  return (
    <TextBox props={{ marginLeft: '0.5rem', width: '60rem', flexDirection: 'column', alignItems: 'center' }}>
      <Heading>{network.name}</Heading>
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
                {/*<Storage section={Camel(pallet.name)} />*/}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </TextBox>
  );
}
