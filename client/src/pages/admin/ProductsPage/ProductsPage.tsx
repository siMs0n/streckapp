import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
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
  useDisclosure,
  useToast,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import AdminMenu from '../../../components/AdminMenu';
import { CreateProductDto, Product, UpdateProductDto } from '../../../types';
import { IconButton } from '@chakra-ui/react';
import DeletePopover from '../../../components/DeletePopover';
import useProducts from '../../../hooks/useProducts';
import AdminInstanceHeader from '../../../components/AdminInstanceHeader';
import useProductCategories from '../../../hooks/useProductCategories';
import EditProductModal from './EditProuductModal';
import AddProduct from './AddProduct';

export default function ProductsPage() {
  const [productToEdit, setProductToEdit] = useState<Product>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { productCategories } = useProductCategories();

  const onAddProduct = (
    newProduct: Partial<Omit<CreateProductDto, 'instance'>>,
  ) => {
    if (newProduct.name && newProduct.price && newProduct.price > 0) {
      const productToAdd = { ...newProduct };
      if (productToAdd.available === undefined) {
        productToAdd.available = false;
      }
      addProduct(productToAdd as Omit<CreateProductDto, 'instance'>);
    } else {
      toast({
        description: 'Kunde inte lägga till produkt',
        status: 'error',
      });
    }
  };

  const onUpdateProduct = (updatedProduct: UpdateProductDto) => {
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
                w={{ base: 'auto', md: '700px' }}
                size={tableSize}
              >
                <Thead>
                  <Tr>
                    <Th>Namn</Th>
                    <Th>Saldo</Th>
                    <Th>Kategori</Th>
                    <Th>Tillgänglig</Th>
                    <Th>Redigera / Ta bort</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products?.map((product) => (
                    <Tr key={product._id}>
                      <Td>{product.name}</Td>
                      <Td>{product.price} kr</Td>
                      <Td>{product.category.name}</Td>
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
          <AddProduct
            productCategories={productCategories}
            onAddProduct={onAddProduct}
          />
        </Flex>
      </Flex>
      {productToEdit && (
        <EditProductModal
          product={productToEdit}
          productCategories={productCategories}
          isOpen={isOpen}
          onClose={onCloseUpdateModal}
          onSave={onUpdateProduct}
        />
      )}
    </Container>
  );
}
