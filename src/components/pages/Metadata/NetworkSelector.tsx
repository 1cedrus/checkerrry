import { Menu, MenuButton, MenuList, MenuItem, Button, Avatar } from '@chakra-ui/react';
import { useApisContext } from 'providers/ApisProvider.tsx';
import { SUPPORTED_NETWORKS } from 'utils/networks.ts';

export default function NetworkSelector() {
  const {
    apiSelected: { network },
    selectApi,
  } = useApisContext();

  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={<Avatar size='sm' src={network.logo} />}
        borderRadius='none'
        boxShadow='2px 2px gray'
        border='solid 1px gray'
        width='10rem'>
        {network.name}
      </MenuButton>
      <MenuList borderRadius='none' boxShadow='2px 2px gray' border='solid 1px gray'>
        {Object.values(SUPPORTED_NETWORKS).map((one) => (
          <MenuItem key={one.id} onClick={() => selectApi(one.provider)}>
            <Avatar size='xs' src={one.logo} marginRight='1rem' />
            <span>{one.name}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
