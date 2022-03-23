import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import AdminMenu from '../../components/AdminMenu';
import PaginatedTable from '../../components/PaginatedTable';
import dayjs from 'dayjs';
import usePayments from '../../hooks/usePayments';
import AdminInstanceHeader from '../../components/AdminInstanceHeader';
import { Payment } from '../../types';
import { Column } from 'react-table';

export default function PaymentsPage() {
  const { payments, limit, setLimit, page, setPage, total } = usePayments();

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
              overflowX="auto"
            >
              <PaginatedTable<Payment>
                columns={tableColumns}
                data={payments}
                totalCount={total}
                queryLimit={limit}
                queryPage={page}
                setQueryLimit={(l) => setLimit(l)}
                setQueryPage={(p) => setPage(p)}
              />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
}

const tableColumns: Column<Payment>[] = [
  {
    Header: 'Tid',
    accessor: 'createdAt',
    Cell: ({ value }: { value: string }) =>
      dayjs(value).format('YYYY-MM-DD HH:mm'),
  },
  {
    Header: 'Användare',
    accessor: (row: Payment) => row?.person?.name || 'Borttagen',
  },
  {
    Header: 'Summa',
    accessor: 'amount',
    Cell: ({ value }: { value: string }) => `${value} kr`,
  },
  {
    Header: 'Referens',
    accessor: 'reference',
  },
];
