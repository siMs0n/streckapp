import React from 'react';
import { Heading, Link, HStack, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { adminBaseInstanceUrl } from '../routes/paths';
import useCurrentInstance from '../hooks/useCurrentInstance';
import usePersons from '../hooks/usePersons';

export default function AdminInstanceHeader() {
  const { instance } = useCurrentInstance();
  const { persons } = usePersons();
  const totalAmount = persons?.reduce((acc, p) => acc + p.balance, 0);

  return (
    <HStack
      alignItems="baseline"
      justifyContent="space-between"
      maxW={1600}
      pr={4}
    >
      <HStack alignItems="baseline">
        <Heading mr={2}>{instance?.name}</Heading>
        <Link as={RouterLink} to={adminBaseInstanceUrl} fontSize="small">
          Byt spex
        </Link>
      </HStack>
      {totalAmount && <Text>Total summa i kassan: {totalAmount} kr</Text>}
    </HStack>
  );
}
