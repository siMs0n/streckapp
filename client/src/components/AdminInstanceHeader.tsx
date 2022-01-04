import React from 'react';
import { Heading, Link, HStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { adminBaseInstanceUrl } from '../routes/paths';
import useCurrentInstance from '../hooks/useCurrentInstance';

export default function AdminInstanceHeader() {
  const { instance } = useCurrentInstance();

  return (
    <HStack alignItems="baseline">
      <Heading mr={2}>{instance?.name}</Heading>
      <Link as={RouterLink} to={adminBaseInstanceUrl} fontSize="small">
        Byt spex
      </Link>
    </HStack>
  );
}
