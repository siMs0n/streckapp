import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Select,
  Spacer,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import NumberInputMobile from '../components/NumberInputMobile';
import { getPersons, getProducts, makePurchase } from '../api/api-methods';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const buttonVariants = {
  normal: { scale: 1 },
  success: { scale: 1.2 },
};

let loadingTimeout: NodeJS.Timeout;

export default function HomePage() {
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product>();
  const [selectedPersonId, setSelectedPersonId] = React.useState<string>();
  const [quantity, setQuantity] = React.useState(1);
  const [buttonSuccess, setButtonSuccess] = React.useState(false);
  const { data: products } = useQuery('products', getProducts);
  const { data: persons } = useQuery('persons', getPersons);
  const queryClient = useQueryClient();
  const purchaseMutation = useMutation(makePurchase, {
    onSuccess: () => {
      setSelectedProduct(undefined);
      setQuantity(1);
      queryClient.invalidateQueries('persons');
      setButtonSuccess(true);
      setTimeout(() => setButtonSuccess(false), 2000);
    },
  });

  //Show spinner if server is cold starting and takes extra long to load
  useEffect(() => {
    if (!persons) {
      loadingTimeout = setTimeout(() => {
        if (!persons) {
          setShowSpinner(true);
        }
      }, 1000);
    } else if (persons) {
      clearTimeout(loadingTimeout);
      setShowSpinner(false);
    }
  }, [persons, showSpinner]);

  const onChangeSelectedPerson = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const personId = event.target.value as string;
    setSelectedPersonId(personId);
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

  const onPurchase = () => {
    if (!selectedPersonId || !selectedProduct || quantity < 1) {
      return;
    }
    const purchase = {
      productId: selectedProduct._id,
      quantity,
      personId: selectedPersonId,
    };
    purchaseMutation.mutate(purchase);
  };

  const selectedPerson = persons?.find((p) => p._id === selectedPersonId);

  if (showSpinner) {
    return (
      <Container centerContent>
        <Flex flexDirection="column" alignItems="center" mt={8}>
          <Text>Hämtar data...</Text>
          <Spinner mt={8} size="xl" />
        </Flex>
      </Container>
    );
  }

  return (
    <Container centerContent>
      <Flex w="100%" py={2}>
        <Select
          w={200}
          size="sm"
          placeholder="Välj person"
          onChange={onChangeSelectedPerson}
          value={selectedPersonId}
        >
          {persons?.map((person) => (
            <option value={person._id} key={person._id}>
              {person.name}
            </option>
          ))}
        </Select>
        <Spacer />
        <Box>
          {selectedPerson && <Text>Saldo: {selectedPerson.balance} kr</Text>}
        </Box>
      </Flex>
      <Text mt={8}>Streckar på:</Text>
      <Heading as="h1" size="2xl" mt={4} mb={16}>
        {selectedPerson?.name}
      </Heading>
      {products ? (
        <MotionBox
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transformOrigin="left"
          transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
        >
          <Box w={300}>
            <Select
              placeholder="Välj dryck"
              value={selectedProduct?._id || ''}
              onChange={onChangeSelectedProduct}
            >
              {products.map((product) => (
                <option value={product._id} key={product._id}>
                  {product.name} ({product.price} kr)
                </option>
              ))}
            </Select>
          </Box>
          <Box w={300} mt={8}>
            <Text>Antal</Text>
            <NumberInputMobile value={quantity} onChange={setQuantity} />
          </Box>
          <Box w={300} mt={16} display="flex" justifyContent="center">
            <MotionButton
              colorScheme={buttonSuccess ? 'green' : 'orange'}
              disabled={!selectedProduct && !buttonSuccess}
              w={160}
              onClick={onPurchase}
              isLoading={purchaseMutation.isLoading}
              loadingText="Laddar"
              whileTap={{ scale: 0.9 }}
              animate={buttonSuccess ? 'success' : 'normal'}
              variants={buttonVariants}
            >
              {buttonSuccess ? 'Streckat!' : 'Strecka'}
            </MotionButton>
          </Box>
        </MotionBox>
      ) : (
        <Spinner size="xl" />
      )}
    </Container>
  );
}
