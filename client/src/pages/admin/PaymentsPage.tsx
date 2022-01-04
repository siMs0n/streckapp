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
} from '@chakra-ui/react';
import AdminMenu from '../../components/AdminMenu';
import dayjs from 'dayjs';
import usePayments from '../../hooks/usePayments';
import AdminInstanceHeader from '../../components/AdminInstanceHeader';

export default function PaymentsPage() {
  const { payments } = usePayments();

  return (
    <Container paddingTop="50px" pl={8} maxW={1600}>
      <AdminInstanceHeader />
      <Flex pt="100px" flexDirection="column">
        <Heading mb={4} ml="200px">
          Betalningar
        </Heading>
        <Flex>
          <Box w={200}>
            <AdminMenu />
          </Box>
          <Box mr={8}>
            <Box borderWidth="1px" borderRadius="lg" p={4}>
              <Table variant="simple" colorScheme="purple" w={600}>
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
