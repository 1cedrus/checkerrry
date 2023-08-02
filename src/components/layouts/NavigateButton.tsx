import { Box, Button, SlideFade, useTab, useDisclosure, Flex } from '@chakra-ui/react';
import { Tabs, TabList } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SettingsIcon } from '@chakra-ui/icons';

export default function NavigateButton() {
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

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
        <Tabs variant='enclosed'>
          <TabList>
            <CustomTab onClick={() => navigate('/balances')}>Balances</CustomTab>
            <CustomTab onClick={() => navigate('/metadata')}>Metadata</CustomTab>
          </TabList>
        </Tabs>
      </SlideFade>
      <Button onClick={onToggle} boxShadow='5px 5px gray' borderRadius='none' border='1px solid gray'>
        <SettingsIcon />
      </Button>
    </Flex>
  );
}
