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
import { useQuery } from 'react-query';
import { getPayments } from '../../api/admin-api-methods';
import AdminMenu from '../../components/AdminMenu';
import dayjs from 'dayjs';

export default function PaymentsPage() {
  const { data } = useQuery('payments', getPayments);

  return (
    <Container paddingTop="150px" pl={8} maxW={1600}>
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
                  <Th>Namn</Th>
                  <Th>Summa</Th>
                  <Th>Referens</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data
                  ?.sort((a, b) =>
                    dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1,
                  )
                  .map((payment) => (
                    <Tr key={payment._id}>
                      <Td>
                        {dayjs(payment.createdAt).format('YYYY-MM-DD HH:mm')}
                      </Td>
                      <Td>{payment.person.name}</Td>
                      <Td>{payment.amount} kr</Td>
                      <Td>{payment.reference}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
