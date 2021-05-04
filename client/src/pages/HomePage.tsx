import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Select,
  Spacer,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import NumberInputMobile from '../components/NumberInputMobile';
import {
  getPersons,
  getProducts,
  makePurchase,
  makePayment,
} from '../api/api-methods';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import SwishIcon from '../images/SwishIcon';
import { CheckIcon } from '@chakra-ui/icons';
import usePinAuth from '../hooks/usePinAuth';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

let loadingTimeout: NodeJS.Timeout;

interface SwishPayment {
  amount: number;
  reference: string;
  swishLink: string;
}

export default function HomePage() {
  const { isLoading: authIsLoading } = usePinAuth();
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product>();
  const [selectedPersonId, setSelectedPersonId] = React.useState<string>(
    localStorage.getItem('selectedPersonId') || '',
  );
  const [quantity, setQuantity] = React.useState(1);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [buttonSuccess, setButtonSuccess] = React.useState(false);
  const [swishPayment, setSwishPayment] = React.useState<SwishPayment>();
  const [showPaymentSuccess, setShowPaymentSuccess] = React.useState(false);

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
  const paymentMutation = useMutation(makePayment, {
    onSuccess: () => {
      setSwishPayment(undefined);
      queryClient.invalidateQueries('persons');
      setShowPaymentSuccess(true);
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
    localStorage.setItem('selectedPersonId', personId);
    setShowPaymentSuccess(false);
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
      product: selectedProduct._id,
      quantity,
      person: selectedPersonId,
    };
    purchaseMutation.mutate(purchase);
  };

  const selectedPerson = persons?.find((p) => p._id === selectedPersonId);

  const onChangePaymentAmount = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const amount = parseInt((event.target as HTMLInputElement).value);
    if (amount) {
      const swishNumber = '';
      const reference = makeID();
      const swishData = {
        version: 1,
        payee: {
          value: swishNumber,
        },
        message: {
          value: 'Plussa: ' + reference,
        },
        amount: {
          value: amount,
        },
      };
      setSwishPayment({
        amount,
        reference,
        swishLink:
          'swish://payment?data=' +
          encodeURIComponent(JSON.stringify(swishData)),
      });
    } else {
      setSwishPayment(undefined);
    }
  };

  const onConfirmPayment = () => {
    if (!selectedPersonId || !swishPayment) {
      return;
    }
    const payment = {
      amount: swishPayment.amount,
      reference: swishPayment.reference,
      person: selectedPersonId,
    };
    paymentMutation.mutate(payment);
  };

  if (showSpinner || authIsLoading) {
    return (
      <Container centerContent>
        <Flex flexDirection="column" alignItems="center" mt={8}>
          <Text>Hämtar data...</Text>
          <Spinner mt={8} size="xl" />
        </Flex>
      </Container>
    );
  }

  if (!selectedPerson) {
    return (
      <Container centerContent>
        <Flex
          w="100%"
          height="90vh"
          py={2}
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <MotionBox
            initial={{ opacity: 0, translateY: 40 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <Heading mb={8}>Hej!</Heading>
            <Select
              w={200}
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
          </MotionBox>
        </Flex>
      </Container>
    );
  }

  return (
    <Container centerContent maxW={600}>
      <Flex w="100%" py={2} alignItems="center">
        <Select
          w={200}
          placeholder="Välj person"
          onChange={onChangeSelectedPerson}
          value={selectedPersonId}
        >
          {persons
            ?.sort((a, b) => a.name.localeCompare(b.name))
            .map((person) => (
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
      <Text mt={8}>{tabIndex === 0 ? 'Streckar på:' : 'Plussar på:'}</Text>
      <Heading as="h1" size="2xl" mt={4} mb={16}>
        {selectedPerson?.name}
      </Heading>
      <Tabs
        variant="unstyled"
        size="lg"
        align="center"
        onChange={(index) => setTabIndex(index)}
      >
        <TabPanels>
          <TabPanel>
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
                    onClick={onPurchase}
                    isLoading={purchaseMutation.isLoading}
                    loadingText="Laddar"
                    whileTap={{ scale: 0.9 }}
                  >
                    {buttonSuccess ? 'Streckat!' : 'Strecka'}
                  </MotionButton>
                </Box>
              </MotionBox>
            ) : (
              <Spinner size="xl" />
            )}
          </TabPanel>
          <TabPanel>
            {showPaymentSuccess ? (
              <Box>
                <Heading size="xl" mb={6}>
                  Bekräftat <CheckIcon />
                </Heading>
                <Text mb={2}>Nytt saldo:</Text>
                <Heading size="xl" mb={6}>
                  {selectedPerson && selectedPerson.balance} kr
                </Heading>
                <Button onClick={() => setShowPaymentSuccess(false)}>
                  Plussa igen
                </Button>
              </Box>
            ) : (
              <Box>
                <Box w={300} mb={8} textAlign="left">
                  <Text mb={2}>Summa att plussa (kr)</Text>
                  <Input
                    placeholder="400"
                    onChange={onChangePaymentAmount}
                    type="number"
                  />
                </Box>
                {swishPayment && (
                  <MotionBox
                    initial={{ opacity: 0, translateY: 40 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <SwishButton link={swishPayment.swishLink} />
                    <Text mt={8}>Tryck på bekräfta efter du har swishat</Text>
                    <Button
                      mt={4}
                      colorScheme="purple"
                      onClick={onConfirmPayment}
                      loading={paymentMutation.isLoading}
                      loadingText="Laddar"
                    >
                      Bekräfta
                    </Button>
                  </MotionBox>
                )}
              </Box>
            )}
          </TabPanel>
        </TabPanels>
        <TabList
          position="fixed"
          bottom={0}
          left="50%"
          transform="translateX(-50%)"
          w="100%"
          maxWidth={600}
        >
          <Tab w="50%" _selected={{ color: 'white', bg: 'purple.800' }}>
            Strecka
          </Tab>
          <Tab w="50%" _selected={{ color: 'white', bg: 'purple.800' }}>
            Plussa
          </Tab>
        </TabList>
      </Tabs>
    </Container>
  );
}

type SwishButtonProps = {
  link: string;
};

const SwishButton = ({ link }: SwishButtonProps) => {
  return (
    <Box
      as={'a'}
      href={link}
      height="56px"
      bg="white"
      color="black"
      display="flex"
      alignItems="center"
      borderRadius="6px"
      fontSize="16px"
      fontWeight="semibold"
      pl={3}
      w={200}
    >
      <SwishIcon />
      <Text ml={4}>Öppna Swish</Text>
    </Box>
  );
};

function makeID() {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
