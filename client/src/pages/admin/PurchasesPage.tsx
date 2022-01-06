import React from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import AdminMenu from '../../components/AdminMenu';
import dayjs from 'dayjs';
import usePurchases from '../../hooks/usePurchases';
import AdminInstanceHeader from '../../components/AdminInstanceHeader';

export default function PurchasesPage() {
  const { purchases } = usePurchases();
  const tableSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Container pt={{ base: 2, md: '50px' }} pl={{ base: 2, md: 8 }} maxW={1600}>
      <AdminInstanceHeader />
      <Flex pt={{ base: 2, md: '100px' }} flexDirection="column">
        <Heading mb={4} ml={{ base: 0, md: '200px' }}>
          Streck
        </Heading>
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Box w={{ base: 'auto', md: 200 }}>
            <AdminMenu />
          </Box>
          <Box mr={{ base: 0, md: 8 }}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p={{ base: 1, md: 4 }}
              overflowX="scroll"
            >
              <Table
                variant="simple"
                colorScheme="purple"
                w={{ base: 'auto', md: '700px' }}
                size={tableSize}
              >
                <Thead>
                  <Tr>
                    <Th>Tid</Th>
                    <Th>Användare</Th>
                    <Th>Produkt</Th>
                    <Th>Antal</Th>
                    <Th>Summa</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {purchases
                    ?.sort((a, b) =>
                      dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1,
                    )
                    .map((purchase) => (
                      <Tr key={purchase._id}>
                        <Td>
                          {dayjs(purchase.createdAt).format('YYYY-MM-DD HH:mm')}
                        </Td>
                        <Td>{purchase?.person?.name || 'Borttagen'}</Td>
                        <Td>{purchase?.product?.name || 'Borttagen'}</Td>
                        <Td>{purchase.quantity}</Td>
                        <Td>{purchase.amount} kr</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
}
