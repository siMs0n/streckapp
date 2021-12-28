import { Box, Button, Text, Select, Spinner } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { makePurchase } from '../../api/api-methods';
import { Product } from '../../types';
import NumberInputMobile from '../NumberInputMobile';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

interface ProductsTabProps {
  products?: Product[];
  selectedPersonId: string;
}

const ProductsTab = ({ products, selectedPersonId }: ProductsTabProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [buttonSuccess, setButtonSuccess] = useState(false);

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

  const onChangeSelectedProduct = (
    event: React.ChangeEvent<{ value: unknown }>,
  ) => {
    const productId = event.target.value as string;
    const product = products?.find((p) => p._id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const handlePurchase = () => {
    if (!selectedPersonId || !selectedProduct || quantity < 1) {
      return;
    }
    const purchase = {
      product: selectedProduct._id,
      quantity,
      person: selectedPersonId,
    };
    purchaseMutation.mutate(purchase);
  };

  if (!products) {
    return <Spinner size="xl" />;
  }
  return (
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
          textAlign="center"
        >
          {products
            .filter((p) => p.available)
            .map((product) => (
              <option value={product._id} key={product._id}>
                {product.name} ({product.price} kr)
              </option>
            ))}
        </Select>
      </Box>
      <Box w={300} mt={8} textAlign="left">
        <Text mb={2} textAlign="center">
          Antal
        </Text>
        <NumberInputMobile value={quantity} onChange={setQuantity} />
      </Box>
      <Box w={300} mt={16} display="flex" justifyContent="center">
        <MotionButton
          colorScheme={buttonSuccess ? 'green' : 'purple'}
          disabled={!selectedProduct && !buttonSuccess}
          w={160}
          onClick={handlePurchase}
          isLoading={purchaseMutation.isLoading}
          loadingText="Laddar"
          whileTap={{ scale: 0.9 }}
        >
          {buttonSuccess ? 'Streckat!' : 'Strecka'}
        </MotionButton>
      </Box>
    </MotionBox>
  );
};

export default ProductsTab;
