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
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import AdminMenu from '../../components/AdminMenu';
import { CreateProductDto, Product } from '../../types';
import { IconButton } from '@chakra-ui/react';
import DeletePopover from '../../components/DeletePopover';
import useProducts from '../../hooks/useProducts';
import AdminInstanceHeader from '../../components/AdminInstanceHeader';

export default function ProductsPage() {
  const [newProduct, setNewProduct] = useState<
    Partial<Omit<CreateProductDto, 'instance'>>
  >({});
  const [productToEdit, setProductToEdit] = useState<Product>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();

  const onAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.price > 0) {
      const productToAdd = { ...newProduct };
      if (productToAdd.available === undefined) {
        productToAdd.available = false;
      }
      addProduct(productToAdd as Omit<CreateProductDto, 'instance'>);
      setNewProduct({});
    } else {
      toast({
        description: 'Kunde inte lägga till produkt',
        status: 'error',
      });
    }
  };

  const onUpdateProduct = (updatedProduct: Product) => {
    updateProduct(updatedProduct);
    onCloseUpdateModal();
  };

  const onCloseUpdateModal = () => {
    setProductToEdit(undefined);
    onClose();
  };

  const tableSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Container pt={{ base: 2, md: '50px' }} pl={{ base: 2, md: 8 }} maxW={1600}>
      <AdminInstanceHeader />
      <Flex pt={{ base: 2, md: '100px' }} flexDirection="column">
        <Heading mb={4} ml={{ base: 0, md: '200px' }}>
          Produkter
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
                    <Th>Namn</Th>
                    <Th>Saldo</Th>
                    <Th>Tillgänglig</Th>
                    <Th>Redigera / Ta bort</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products?.map((product) => (
                    <Tr key={product._id}>
                      <Td>{product.name}</Td>
                      <Td>{product.price} kr</Td>
                      <Td>{product.available ? 'Ja' : 'Nej'}</Td>
                      <Td>
                        <IconButton
                          aria-label="Redigera"
                          icon={<EditIcon />}
                          mr={{ base: 1, md: 4 }}
                          onClick={() => {
                            setProductToEdit(product);
                            onOpen();
                          }}
                        />
                        <DeletePopover
                          name={product.name}
                          onDelete={() => deleteProduct(product._id)}
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
      </Flex>
      {productToEdit && (
        <EditProductModal
          product={productToEdit}
          isOpen={isOpen}
          onClose={onCloseUpdateModal}
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
