import { Box, Button, SlideFade, useTab, useDisclosure, Flex } from '@chakra-ui/react';
import { Tabs, TabList } from '@chakra-ui/react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons';

enum Location {
  Welcome = '/',
  Balances = '/balances',
  Metadata = '/metadata',
}

const defaultIndex = (pathname: string) => {
  switch (pathname) {
    case Location.Welcome:
      return 0;
    case Location.Balances:
      return 1;
    case Location.Metadata:
      return 2;
  }
};

export default function NavigateButton() {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const { pathname } = useLocation();

  console.log(location);

  const CustomTab = React.forwardRef((props: any, ref: any) => {
    const tabProps = useTab({ ...props, ref });
    const isSelected = tabProps['aria-selected'];

    return (
      <Button boxShadow='5px 5px gray' borderRadius='none' border='1px solid gray' fontWeight='normal' {...tabProps}>
        <Box as='span' mr='2'>
          {isSelected ? '😎' : '😐'}
        </Box>
        {tabProps.children}
      </Button>
    );
  });

  return (
    <Flex position='fixed' right='0'>
      <SlideFade in={isOpen} offsetY='-10rem'>
        <Tabs variant='enclosed' defaultIndex={defaultIndex(pathname)}>
          <TabList>
            <CustomTab onClick={() => navigate(Location.Welcome)}>Welcome</CustomTab>
            <CustomTab onClick={() => navigate(Location.Balances)}>Balances</CustomTab>
            <CustomTab onClick={() => navigate(Location.Metadata)}>Metadata</CustomTab>
          </TabList>
        </Tabs>
      </SlideFade>
      <Button onClick={onToggle} boxShadow='5px 5px gray' borderRadius='none' border='1px solid gray'>
        <SettingsIcon />
      </Button>
    </Flex>
  );
}

// TODO: handle issue about tab.
