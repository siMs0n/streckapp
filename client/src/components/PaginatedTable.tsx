import { useEffect } from 'react';
import {
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useTable, usePagination, Column } from 'react-table';

import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';

interface IPaginatedTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  totalCount: number;
  queryPage: number;
  queryLimit: number;
  setQueryPage: (page: number) => void;
  setQueryLimit: (page: number) => void;
}

const PaginatedTable = <T extends object>({
  columns,
  data,
  totalCount,
  queryPage,
  queryLimit,
  setQueryPage,
  setQueryLimit,
}: IPaginatedTableProps<T>) => {
  const tableSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const isMobile = useBreakpointValue({ base: true, md: false });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: queryPage - 1, pageSize: queryLimit },
      manualPagination: true,
      pageCount: Math.ceil(totalCount / queryLimit),
    },
    usePagination,
  );

  useEffect(() => {
    setQueryPage(pageIndex + 1);
  }, [pageIndex, setQueryPage]);

  useEffect(() => {
    setQueryLimit(pageSize);
  }, [pageSize, setQueryLimit]);

  return (
    <>
      <Table
        variant="simple"
        colorScheme="purple"
        w={{ base: 'auto', md: '800px' }}
        size={tableSize}
        {...getTableProps()}
      >
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex
        justifyContent="space-between"
        m={4}
        alignItems="center"
        wrap="wrap"
      >
        <Flex>
          <Tooltip label="Första sidan">
            <IconButton
              onClick={() => gotoPage(0)}
              isDisabled={!canPreviousPage}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
              aria-label="Första sidan"
            />
          </Tooltip>
          <Tooltip label="Föregående sida">
            <IconButton
              onClick={previousPage}
              isDisabled={!canPreviousPage}
              icon={<ChevronLeftIcon h={6} w={6} />}
              aria-label="Föregående sida"
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center" wrap="wrap">
          <Text flexShrink={0} mr={isMobile ? 0 : 8}>
            Sida{' '}
            <Text fontWeight="bold" as="span">
              {pageIndex + 1}
            </Text>{' '}
            av{' '}
            <Text fontWeight="bold" as="span">
              {pageOptions.length}
            </Text>
          </Text>
          {!isMobile && (
            <>
              <Text flexShrink={0}>Gå till sida:</Text>{' '}
              <NumberInput
                ml={2}
                mr={8}
                w={28}
                min={1}
                max={pageOptions.length}
                onChange={(value) => {
                  const page = value ? parseInt(value) - 1 : 0;
                  gotoPage(page);
                }}
                defaultValue={pageIndex + 1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Select
                w={32}
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Visa {pageSize}
                  </option>
                ))}
              </Select>
            </>
          )}
        </Flex>

        <Flex>
          <Tooltip label="Nästa sida">
            <IconButton
              onClick={nextPage}
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
              aria-label="Nästa sida"
            />
          </Tooltip>
          <Tooltip label="Sista sidan">
            <IconButton
              onClick={() => gotoPage(pageCount - 1)}
              isDisabled={!canNextPage}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
              aria-label="Sista sidan"
            />
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
};

export default PaginatedTable;
