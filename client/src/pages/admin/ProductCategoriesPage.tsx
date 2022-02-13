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
import { CreateProductCategoryDto, ProductCategory } from '../../types';
import { IconButton } from '@chakra-ui/react';
import DeletePopover from '../../components/DeletePopover';
import useProductCategories from '../../hooks/useProductCategories';
import AdminInstanceHeader from '../../components/AdminInstanceHeader';

export default function ProductCategoriesPage() {
  const [newProductCategory, setNewProductCategory] = useState<
    Partial<Omit<CreateProductCategoryDto, 'instance'>>
  >({});
  const [
    productCategoryToEdit,
    setProductCategoryToEdit,
  ] = useState<ProductCategory>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {
    productCategories,
    addProductCategory,
    updateProductCategory,
    deleteProductCategory,
  } = useProductCategories();

  const onAddProductCategory = () => {
    if (newProductCategory.name) {
      const ProductCategoryToAdd = { ...newProductCategory };
      addProductCategory(
        ProductCategoryToAdd as Omit<CreateProductCategoryDto, 'instance'>,
      );
      setNewProductCategory({});
    } else {
      toast({
        description: 'Kunde inte lägga till kategori',
        status: 'error',
      });
    }
  };

  const onUpdateProductCategory = (updatedProductCategory: ProductCategory) => {
    updateProductCategory(updatedProductCategory);
    onCloseUpdateModal();
  };

  const onCloseUpdateModal = () => {
    setProductCategoryToEdit(undefined);
    onClose();
  };

  const tableSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Container pt={{ base: 2, md: '50px' }} pl={{ base: 2, md: 8 }} maxW={1600}>
      <AdminInstanceHeader />
      <Flex pt={{ base: 2, md: '100px' }} flexDirection="column">
        <Heading mb={4} ml={{ base: 0, md: '200px' }}>
          Produktkategorier
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
                    <Th>Redigera / Ta bort</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {productCategories?.map((productCategory) => (
                    <Tr key={productCategory._id}>
                      <Td>{productCategory.name}</Td>
                      <Td>
                        <IconButton
                          aria-label="Redigera"
                          icon={<EditIcon />}
                          mr={{ base: 1, md: 4 }}
                          onClick={() => {
                            setProductCategoryToEdit(productCategory);
                            onOpen();
                          }}
                        />
                        <DeletePopover
                          name={productCategory.name}
                          onDelete={() =>
                            deleteProductCategory(productCategory._id)
                          }
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
            <Heading size="md">Lägg till ny produktkategori</Heading>
            <Input
              placeholder="Namn"
              my={8}
              value={newProductCategory?.name || ''}
              onChange={(e) =>
                setNewProductCategory({
                  ...newProductCategory,
                  name: e.target.value,
                })
              }
            ></Input>
            <Button
              rightIcon={<AddIcon />}
              colorScheme="green"
              onClick={onAddProductCategory}
            >
              Lägg till
            </Button>
          </Box>
        </Flex>
      </Flex>
      {productCategoryToEdit && (
        <EditProductCategoryModal
          productCategory={productCategoryToEdit}
          isOpen={isOpen}
          onClose={onCloseUpdateModal}
          onSave={onUpdateProductCategory}
        />
      )}
    </Container>
  );
}

type EditProductCategoryModalProps = {
  productCategory: ProductCategory;
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductCategory) => void;
};

const EditProductCategoryModal = ({
  productCategory,
  isOpen,
  onClose,
  onSave,
}: EditProductCategoryModalProps) => {
  const [
    updatedProductCategory,
    setUpdatedProductCategory,
  ] = useState<ProductCategory>(productCategory);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Redigera "{productCategory.name}"</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Namn"
            my={8}
            value={updatedProductCategory?.name || ''}
            onChange={(e) =>
              setUpdatedProductCategory({
                ...updatedProductCategory,
                name: e.target.value,
              })
            }
          ></Input>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Avbryt
          </Button>
          <Button
            colorScheme="green"
            onClick={() => onSave(updatedProductCategory)}
          >
            Spara
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
