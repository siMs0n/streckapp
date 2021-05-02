import React from 'react';
import { Flex, IconButton, Text } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

type NumberInputMobileProps = {
  value: number;
  onChange: Function;
};

const NumberInputMobile = ({ value, onChange }: NumberInputMobileProps) => {
  return (
    <Flex justifyContent="space-around" maxW="320px">
      <IconButton
        aria-label="Subtract"
        icon={<MinusIcon />}
        onClick={() => onChange(Math.max(1, value - 1))}
      ></IconButton>
      <Text fontSize="3xl">{value}</Text>
      <IconButton
        aria-label="Add"
        icon={<AddIcon />}
        onClick={() => onChange(Math.min(50, value + 1))}
      ></IconButton>
    </Flex>
  );
};

export default NumberInputMobile;
