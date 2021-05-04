import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addProduct } from '../../api/admin-api-methods';
import { getProducts } from '../../api/api-methods';
import AdminMenu from '../../components/AdminMenu';
import { CreateProductDto } from '../../types';

export default function ProductsPage() {
  const [newProduct, setNewProduct] = useState<Partial<CreateProductDto>>({});
  const queryClient = useQueryClient();
  const { data } = useQuery('products', getProducts);
  const addProductMutation = useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });

  const onAddProduct = () => {
    if (
      newProduct.name &&
      newProduct.price &&
      newProduct.available !== undefined
    ) {
      addProductMutation.mutate(newProduct as CreateProductDto);
      setNewProduct({});
    }
  };

  return (
    <Container paddingTop="150px" pl={8} maxW={1600}>
      <Heading mb={4} ml="200px">
        Produkter
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
                  <Th>Namn</Th>
                  <Th>Saldo</Th>
                  <Th>Tillgänglig</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((product) => (
                  <Tr key={product._id}>
                    <Td>{product.name}</Td>
                    <Td>{product.price} kr</Td>
                    <Td>{product.available ? 'Ja' : 'Nej'}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" p={4}>
          <Heading size="md">Lägg till ny produkt</Heading>
          <Input
            placeholder="Namn"
            my={8}
            value={newProduct?.name || ''}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          ></Input>
          <Input
            placeholder="Pris"
            mb={8}
            value={newProduct?.price || ''}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: parseInt(e.target.value) || 0,
              })
            }
          ></Input>
          <Flex mb={8} alignItems="center">
            <Text mr={4}>Tillgänglig</Text>
            <Switch
              isChecked={Boolean(newProduct?.available)}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  available: !Boolean(newProduct.available),
                })
              }
              colorScheme="purple"
            />
          </Flex>
          <Button
            rightIcon={<AddIcon />}
            colorScheme="green"
            onClick={onAddProduct}
          >
            Lägg till
          </Button>
        </Box>
      </Flex>
    </Container>
  );
}
