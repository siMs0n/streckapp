import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  Select,
  Flex,
  ModalFooter,
  Button,
  Text,
  Switch,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Product, ProductCategory, UpdateProductDto } from '../../../types';

type EditProductModalProps = {
  product: Product;
  productCategories: ProductCategory[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: UpdateProductDto) => void;
};

const EditProductModal = ({
  product,
  productCategories,
  isOpen,
  onClose,
  onSave,
}: EditProductModalProps) => {
  const [updatedProduct, setUpdatedProduct] = useState<UpdateProductDto>({
    ...product,
    category: product.category._id,
  });
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
          <Select
            mb={8}
            placeholder="Välj kategori"
            onChange={(e) =>
              setUpdatedProduct({
                ...updatedProduct,
                category: e.target.value,
              })
            }
            value={updatedProduct?.category || ''}
          >
            {productCategories
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
          </Select>
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

export default EditProductModal;
