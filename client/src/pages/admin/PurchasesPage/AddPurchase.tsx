import { AddIcon, InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  HStack,
  Select,
  Flex,
  Button,
  Switch,
  Text,
  VStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Tooltip,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Person, Product, ProductCategory } from '../../../types';
import MultiSelectPersons from './MultiSelectPersons';

interface AddPurchaseProps {
  persons: Person[];
  productCategories: ProductCategory[];
  products: Product[];
  onAddPurchase: (
    product: Product,
    quantity: number,
    person: Person,
    updatedPrice?: number,
  ) => void;
  onAddMultiPurchase: (
    product: Product,
    quantity: number,
    persons: Person[],
    updatedPrice?: number,
  ) => void;
}

const AddPurchase = ({
  persons,
  productCategories,
  products,
  onAddPurchase,
  onAddMultiPurchase,
}: AddPurchaseProps) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [updatedPrice, setUpdatedPrice] = useState<number>();
  const [multiPurchase, setMultiPurchase] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person>();
  const [selectedPersonIds, setSelectedPersonIds] = useState<string[]>([]);

  const onChangeSelectedCategory = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const categoryId = event.target.value as string;
    const category = productCategories?.find((c) => c._id === categoryId);
    if (category) {
      setSelectedCategory(category);
      setSelectedProduct(undefined);
    }
  };

  const onChangeSelectedProduct = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const productId = event.target.value as string;
    const product = products?.find((p) => p._id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const onChangeSelectedPerson = (personId: string) => {
    const person = persons?.find((p) => p._id === personId);
    setSelectedPerson(person);
  };

  const handleAddPurchase = () => {
    if (selectedProduct && selectedPerson && quantity > 0) {
      onAddPurchase(selectedProduct, quantity, selectedPerson, updatedPrice);
    }
  };

  const handleAddMultiPurchase = () => {
    if (selectedProduct && selectedPersonIds.length > 0 && quantity > 0) {
      const personsToAddPurchaseTo = persons?.filter((p) =>
        selectedPersonIds.includes(p._id),
      );
      onAddMultiPurchase(
        selectedProduct,
        quantity,
        personsToAddPurchaseTo,
        updatedPrice,
      );
    }
  };

  return (
    <VStack
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      flex={1}
      minW="300px"
      maxW="400px"
      spacing={8}
      alignItems="start"
    >
      <Heading size="md">Lägg till streck</Heading>
      <Flex alignItems="center">
        <Text mr={4}>Strecka på flera?</Text>
        <Switch
          isChecked={multiPurchase}
          onChange={(e) => setMultiPurchase(!multiPurchase)}
          colorScheme="purple"
        />
      </Flex>
      {multiPurchase ? (
        <MultiSelectPersons
          persons={persons}
          selectedIds={selectedPersonIds}
          setSelectedIds={setSelectedPersonIds}
        />
      ) : (
        <Select
          placeholder="Välj person"
          onChange={(e) => onChangeSelectedPerson(e.target.value)}
          value={selectedPerson?._id}
        >
          {persons
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((person) => (
              <option value={person._id} key={person._id}>
                {person.name}
              </option>
            ))}
        </Select>
      )}

      <Select
        placeholder="Välj kategori"
        onChange={onChangeSelectedCategory}
        value={selectedCategory?._id || ''}
      >
        {productCategories
          ?.sort((a, b) => a.name.localeCompare(b.name))
          .map((category) => (
            <option value={category._id} key={category._id}>
              {category.name}
            </option>
          ))}
      </Select>
      <Select
        placeholder={'Välj produkt'}
        value={selectedProduct?._id || ''}
        onChange={onChangeSelectedProduct}
        textAlign="center"
        disabled={!selectedCategory}
      >
        {products
          .filter((p) => p.category._id === selectedCategory?._id)
          .map((product) => (
            <option value={product._id} key={product._id}>
              {product.name} ({product.price} kr)
            </option>
          ))}
      </Select>
      {selectedProduct && (
        <HStack>
          <Box>
            <Text mb={1}>Antal</Text>
            <QuantityInput value={quantity} onChange={setQuantity} />
          </Box>
          <Box>
            <HStack mb={1}>
              <Text ml={2}>Pris</Text>
              <Tooltip label="Om du ändrar priset kommer priset på produkten ändras även efteråt">
                <InfoIcon />
              </Tooltip>
            </HStack>
            <PriceInput
              value={updatedPrice || selectedProduct?.price || 0}
              onChange={setUpdatedPrice}
            />
          </Box>
        </HStack>
      )}
      <Button
        rightIcon={<AddIcon />}
        colorScheme="green"
        onClick={multiPurchase ? handleAddMultiPurchase : handleAddPurchase}
      >
        Lägg till
      </Button>
    </VStack>
  );
};

const QuantityInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (q: number) => void;
}) => {
  return (
    <NumberInput
      defaultValue={1}
      min={1}
      value={value}
      onChange={(_, v) => onChange(v)}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

const PriceInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (q: number) => void;
}) => {
  const format = (val: number) => `${val} kr`;
  const parse = (val: string) => parseInt(val.replace(/^ kr/, ''));

  return (
    <NumberInput
      min={1}
      onChange={(valueString) => onChange(parse(valueString))}
      value={format(value)}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default AddPurchase;
