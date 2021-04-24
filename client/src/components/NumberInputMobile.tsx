import React from 'react';
import { Button, HStack, Input, useNumberInput } from '@chakra-ui/react';

type NumberInputMobileProps = {
  value: number;
  onChange: Function;
};

const NumberInputMobile = ({ value, onChange }: NumberInputMobileProps) => {
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    defaultValue: 1,
    value,
    min: 1,
    max: 50,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(parseInt(event.target.value));
  };

  return (
    <HStack maxW="320px">
      <Button {...dec} onClick={() => onChange(value - 1)}>
        -
      </Button>
      <Input {...input} value={value} onChange={handleChange} />
      <Button {...inc} onClick={() => onChange(value + 1)}>
        +
      </Button>
    </HStack>
  );
};

export default NumberInputMobile;
