import React from 'react';
import { Heading, Link, HStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { baseInstanceUrl } from '../routes/paths';
import useCurrentInstance from '../hooks/useCurrentInstance';
import { chosenInstanceKey } from '../pages/InstancesPage';

export default function InstanceHeader() {
  const { instance } = useCurrentInstance();

  return (
    <HStack
      alignItems="baseline"
      justifyContent="space-between"
      borderBottom="1px"
      borderColor="gray.400"
      width="100%"
    >
      <Heading
        mt={1}
        mr={2}
        size="sm"
        color="purple.100"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        overflow="hidden"
        maxWidth="70%"
      >
        {instance?.name}
      </Heading>
      <Link
        as={RouterLink}
        to={baseInstanceUrl}
        fontSize="small"
        onClick={() => localStorage.removeItem(chosenInstanceKey)}
      >
        Byt spex
      </Link>
    </HStack>
  );
}
