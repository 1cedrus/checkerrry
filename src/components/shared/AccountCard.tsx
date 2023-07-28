import { Card, CardBody, Text } from '@chakra-ui/react';
import { Identicon } from '@polkadot/react-identicon';
import { useAddressContext } from 'components/providers/AddressProvider.tsx';
import { isValidAddressPolkadotAddress } from 'utils/validates.ts';

export default function AccountCard() {
  const { address } = useAddressContext();

  if (!address || !isValidAddressPolkadotAddress(address)) return <></>;

  return (
    <Card
      display='flex'
      flexDirection='row'
      width='40rem'
      borderRadius='none'
      padding='1rem'
      boxShadow='5px 5px gray'
      border='solid 1px gray'>
      <Identicon value={address} theme={'polkadot'} />
      <CardBody>
        <Text size='sm'>{address}</Text>
      </CardBody>
    </Card>
  );
}
