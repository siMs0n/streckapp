import { Box, Container, Flex, Heading, useToast } from '@chakra-ui/react';
import { Column } from 'react-table';
import AdminMenu from '../../../components/AdminMenu';
import PaginatedTable from '../../../components/PaginatedTable';
import dayjs from 'dayjs';
import usePurchases from '../../../hooks/usePurchases';
import AdminInstanceHeader from '../../../components/AdminInstanceHeader';
import useProductCategories from '../../../hooks/useProductCategories';
import usePersons from '../../../hooks/usePersons';
import useProducts from '../../../hooks/useProducts';
import AddPurchase from './AddPurchase';
import { Person, Product, Purchase } from '../../../types';
import { useQueryClient, useMutation } from 'react-query';
import { makePurchase } from '../../../api/api-methods';
import useCurrentInstance from '../../../hooks/useCurrentInstance';
import {
  makeMultiPurchase,
  updateProduct,
} from '../../../api/admin-api-methods';

export default function PurchasesPage() {
  const { purchases, limit, setLimit, page, setPage, total } = usePurchases();
  const { instance } = useCurrentInstance();
  const { persons } = usePersons();
  const { products } = useProducts();
  const { productCategories } = useProductCategories();
  const toast = useToast();

  const queryClient = useQueryClient();
  const purchaseMutation = useMutation(makePurchase, {
    onSuccess: () => {
      queryClient.invalidateQueries('persons');
      queryClient.invalidateQueries('purchases');
      toast({
        description: 'Streckat!',
        status: 'success',
      });
    },
  });

  const multiPurchaseMutation = useMutation(makeMultiPurchase, {
    onSuccess: () => {
      queryClient.invalidateQueries('persons');
      queryClient.invalidateQueries('purchases');
      toast({
        description: 'Streckat på alla!',
        status: 'success',
      });
    },
  });

  const updateProductMutation = useMutation(updateProduct);

  const onAddPurchase = (
    product: Product,
    quantity: number,
    person: Person,
    updatedPrice?: number,
  ) => {
    if (product && quantity > 0 && person && instance) {
      const purchase = {
        product: product._id,
        quantity,
        person: person._id,
        instance: instance._id,
      };
      if (updatedPrice) {
        updateProductMutation.mutate(
          {
            ...product,
            category: product.category._id,
            price: updatedPrice,
          },
          {
            onSuccess: () => {
              purchaseMutation.mutate(purchase);
            },
          },
        );
      } else {
        purchaseMutation.mutate(purchase);
      }
    } else {
      toast({
        description: 'Kunde inte lägga till streck',
        status: 'error',
      });
    }
  };

  const onAddMultiPurchase = (
    product: Product,
    quantity: number,
    persons: Person[],
    updatedPrice?: number,
  ) => {
    if (product && quantity > 0 && persons.length > 0 && instance) {
      const multiPurchase = {
        product: product._id,
        quantity,
        persons: persons.map((p) => p._id),
        instance: instance._id,
      };
      if (updatedPrice) {
        updateProductMutation.mutate(
          {
            ...product,
            category: product.category._id,
            price: updatedPrice,
          },
          {
            onSuccess: () => {
              multiPurchaseMutation.mutate(multiPurchase);
            },
          },
        );
      } else {
        multiPurchaseMutation.mutate(multiPurchase);
      }
    } else {
      toast({
        description: 'Kunde inte lägga till streck',
        status: 'error',
      });
    }
  };

  return (
    <Container pt={{ base: 2, md: '50px' }} pl={{ base: 2, md: 8 }} maxW={1800}>
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
              <PaginatedTable<Purchase>
                columns={tableColumns}
                data={purchases}
                totalCount={total}
                queryLimit={limit}
                queryPage={page}
                setQueryLimit={(l) => setLimit(l)}
                setQueryPage={(p) => setPage(p)}
              />
            </Box>
          </Box>
          <AddPurchase
            persons={persons ?? []}
            products={products ?? []}
            productCategories={productCategories}
            onAddPurchase={onAddPurchase}
            onAddMultiPurchase={onAddMultiPurchase}
          />
        </Flex>
      </Flex>
    </Container>
  );
}

const tableColumns: Column<Purchase>[] = [
  {
    Header: 'Tid',
    accessor: 'createdAt',
    Cell: ({ value }: { value: string }) =>
      dayjs(value).format('YYYY-MM-DD HH:mm'),
  },
  {
    Header: 'Användare',
    accessor: (row: Purchase) => row?.person?.name || 'Borttagen',
  },
  {
    Header: 'Produkt',
    accessor: (row: Purchase) => row?.product?.name || 'Borttagen',
  },
  {
    Header: 'Antal',
    accessor: 'quantity',
  },
  {
    Header: 'Summa',
    accessor: 'amount',
    Cell: ({ value }: { value: string }) => `${value} kr`,
  },
];
