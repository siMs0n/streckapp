import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Input,
  Select,
  Flex,
  Button,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { CreateProductDto, ProductCategory } from '../../../types';

interface AddProductProps {
  productCategories: ProductCategory[];
  onAddProduct: (
    productToAdd: Partial<Omit<CreateProductDto, 'instance'>>,
  ) => void;
}

const AddProduct = ({ productCategories, onAddProduct }: AddProductProps) => {
  const [newProduct, setNewProduct] = useState<
    Partial<Omit<CreateProductDto, 'instance'>>
  >({});

  const handleAddProduct = () => {
    onAddProduct(newProduct);
    setNewProduct({});
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" p={4}>
      <Heading size="md">Lägg till ny produkt</Heading>
      <Input
        placeholder="Namn"
        my={8}
        value={newProduct?.name || ''}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
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
      <Select
        mb={8}
        placeholder="Välj kategori"
        onChange={(e) =>
          setNewProduct({
            ...newProduct,
            category: e.target.value,
          })
        }
        value={newProduct?.category || ''}
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
        onClick={handleAddProduct}
      >
        Lägg till
      </Button>
    </Box>
  );
};

export default AddProduct;
