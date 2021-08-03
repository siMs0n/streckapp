import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from '../../api/admin-api-methods';
import { getProducts } from '../../api/api-methods';
import AdminMenu from '../../components/AdminMenu';
import { CreateProductDto, Product } from '../../types';
import { IconButton } from '@chakra-ui/react';
import DeletePopover from '../../components/DeletePopover';

export default function ProductsPage() {
  const [newProduct, setNewProduct] = useState<Partial<CreateProductDto>>({});
  const [productToEdit, setProductToEdit] = useState<Product>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data } = useQuery('products', getProducts);
  const addProductMutation = useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast({
        description: 'Produkt skapad',
        status: 'success',
      });
    },
  });
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast({
        description: 'Produkt borttagen',
        status: 'success',
      });
    },
  });
  const updateProductMutation = useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast({
        description: 'Produkt uppdaterad',
        status: 'success',
      });
    },
  });

  const onAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.price > 0) {
      const productToAdd = { ...newProduct };
      if (productToAdd.available === undefined) {
        productToAdd.available = false;
      }
      addProductMutation.mutate(productToAdd as CreateProductDto);
      setNewProduct({});
    } else {
      toast({
        description: 'Kunde inte lägga till produkt',
        status: 'error',
      });
    }
  };

  const onDeleteProduct = (productId: string) => {
    deleteProductMutation.mutate(productId);
  };

  const onUpdateProduct = (updatedProduct: Product) => {
    updateProductMutation.mutate(updatedProduct);
    onClose();
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
                  <Th>Redigera/Ta bort</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((product) => (
                  <Tr key={product._id}>
                    <Td>{product.name}</Td>
                    <Td>{product.price} kr</Td>
                    <Td>{product.available ? 'Ja' : 'Nej'}</Td>
                    <Td>
                      <IconButton
                        aria-label="Redigera"
                        icon={<EditIcon />}
                        mr={3}
                        onClick={() => {
                          setProductToEdit(product);
                          onOpen();
                        }}
                      />
                      <DeletePopover
                        name={product.name}
                        onDelete={() => onDeleteProduct(product._id)}
                      >
                        <IconButton
                          aria-label="Ta bort"
                          icon={<DeleteIcon />}
                          colorScheme="red"
                        />
                      </DeletePopover>
                    </Td>
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
      {productToEdit && (
        <EditProductModal
          product={productToEdit}
          isOpen={isOpen}
          onClose={onClose}
          onSave={onUpdateProduct}
        />
      )}
    </Container>
  );
}

type EditProductModalProps = {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
};

const EditProductModal = ({
  product,
  isOpen,
  onClose,
  onSave,
}: EditProductModalProps) => {
  const [updatedProduct, setUpdatedProduct] = useState<Product>(product);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Redigera "{product.name}"</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Namn"
            my={8}
            value={updatedProduct?.name || ''}
            onChange={(e) =>
              setUpdatedProduct({ ...updatedProduct, name: e.target.value })
            }
          ></Input>
          <Input
            placeholder="Pris"
            mb={8}
            value={updatedProduct?.price || ''}
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                price: parseInt(e.target.value) || 0,
              })
            }
          ></Input>
          <Flex mb={8} alignItems="center">
            <Text mr={4}>Tillgänglig</Text>
            <Switch
              isChecked={Boolean(updatedProduct?.available)}
              onChange={(e) =>
                setUpdatedProduct({
                  ...updatedProduct,
                  available: !Boolean(updatedProduct.available),
                })
              }
              colorScheme="purple"
            />
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Avbryt
          </Button>
          <Button colorScheme="green" onClick={() => onSave(updatedProduct)}>
            Spara
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
