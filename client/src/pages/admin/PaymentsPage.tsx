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
import usePayments from '../../hooks/usePayments';
import AdminInstanceHeader from '../../components/AdminInstanceHeader';

export default function PaymentsPage() {
  const { payments } = usePayments();

  const tableSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Container pt={{ base: 2, md: '50px' }} pl={{ base: 2, md: 8 }} maxW={1600}>
      <AdminInstanceHeader />
      <Flex pt={{ base: 2, md: '100px' }} flexDirection="column">
        <Heading mb={4} ml={{ base: 0, md: '200px' }}>
          Betalningar
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
                w={{ base: 'auto', md: '600px' }}
                size={tableSize}
              >
                <Thead>
                  <Tr>
                    <Th>Tid</Th>
                    <Th>Användare</Th>
                    <Th>Summa</Th>
                    <Th>Referens</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {payments
                    ?.sort((a, b) =>
                      dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1,
                    )
                    .map((payment) => (
                      <Tr key={payment._id}>
                        <Td>
                          {dayjs(payment.createdAt).format('YYYY-MM-DD HH:mm')}
                        </Td>
                        <Td>{payment?.person?.name || 'Borttagen'}</Td>
                        <Td>{payment.amount} kr</Td>
                        <Td>{payment.reference}</Td>
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
