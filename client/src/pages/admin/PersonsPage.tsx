import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Link,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { addPerson } from '../../api/admin-api-methods';
import { getPersons } from '../../api/api-methods';
import {
  adminPersonsUrl,
  adminProductsUrl,
  adminPaymentsUrl,
  adminPurchasesUrl,
  adminSettingsUrl,
} from '../../routes/paths';

export default function PersonsPage() {
  const [newPersonName, setNewPersonName] = useState('');
  const queryClient = useQueryClient();
  const { data } = useQuery('persons', getPersons);
  const addPersonMutation = useMutation(addPerson, {
    onSuccess: () => {
      queryClient.invalidateQueries('persons');
    },
  });

  const onAddPerson = () => {
    if (newPersonName) {
      addPersonMutation.mutate(newPersonName);
      setNewPersonName('');
    }
  };

  return (
    <Container paddingTop="150px" pl={8} maxW={1600}>
      <Heading mb={4} ml="200px">
        Användare
      </Heading>
      <Flex>
        <Box w={200}>
          <VStack alignItems="flex-start">
            <Link as={RouterLink} to={adminPersonsUrl} fontSize="xl">
              Användare
            </Link>
            <Link as={RouterLink} to={adminProductsUrl} fontSize="xl">
              Produkter
            </Link>
            <Link as={RouterLink} to={adminPaymentsUrl} fontSize="xl">
              Betalningar
            </Link>
            <Link as={RouterLink} to={adminPurchasesUrl} fontSize="xl">
              Streck
            </Link>
            <Link as={RouterLink} to={adminSettingsUrl} fontSize="xl">
              Inställningar
            </Link>
          </VStack>
        </Box>
        <Box mr={8}>
          <Box borderWidth="1px" borderRadius="lg" p={4}>
            <Table variant="simple" colorScheme="purple" w={600}>
              <Thead>
                <Tr>
                  <Th>Namn</Th>
                  <Th>Saldo</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((person) => (
                  <Tr>
                    <Td>{person.name}</Td>
                    <Td>{person.balance} kr</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        <Box maxW="md" borderWidth="1px" borderRadius="lg" p={4}>
          <Heading size="md">Lägg till ny användare</Heading>
          <Input
            placeholder="Namn"
            my={8}
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
          ></Input>
          <Button
            rightIcon={<AddIcon />}
            colorScheme="green"
            onClick={onAddPerson}
          >
            Lägg till
          </Button>
        </Box>
      </Flex>
    </Container>
  );
}
