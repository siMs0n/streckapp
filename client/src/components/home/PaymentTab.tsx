import { CheckIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Text,
  Heading,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { makePayment } from '../../api/api-methods';
import { usePrevious } from '../../hooks/usePrevious';
import SwishIcon from '../../images/SwishIcon';
import { Person } from '../../types';
import useCurrentInstance from '../../hooks/useCurrentInstance';

const MotionBox = motion(Box);

interface SwishPayment {
  amount: number;
  reference: string;
  swishLink: string;
}

interface PaymentTabProps {
  selectedPerson?: Person;
}

const PaymentTab = ({ selectedPerson }: PaymentTabProps) => {
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [swishPayment, setSwishPayment] = useState<SwishPayment>();
  const previousPersonId = usePrevious(selectedPerson?._id);
  const {
    isOpen: isConfirmPaymentOpen,
    onOpen: onConfirmPaymentOpen,
    onClose: onConfirmPaymentClose,
  } = useDisclosure();

  const { instance } = useCurrentInstance();
  const queryClient = useQueryClient();

  const paymentMutation = useMutation(makePayment, {
    onSuccess: () => {
      setSwishPayment(undefined);
      queryClient.invalidateQueries('persons');
      setShowPaymentSuccess(true);
    },
  });

  useEffect(() => {
    if (
      previousPersonId &&
      selectedPerson?._id &&
      previousPersonId !== selectedPerson._id
    ) {
      setShowPaymentSuccess(false);
    }
  }, [selectedPerson?._id, previousPersonId]);

  const onChangePaymentAmount = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const amount = parseInt((event.target as HTMLInputElement).value);
    if (amount) {
      const reference = makeID();
      const swishData = {
        version: 1,
        payee: {
          value: instance?.swishPhoneNumber,
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
    if (!selectedPerson?._id || !swishPayment) {
      return;
    }
    const payment = {
      amount: swishPayment.amount,
      reference: swishPayment.reference,
      person: selectedPerson._id,
    };
    paymentMutation.mutate(payment);
  };

  if (showPaymentSuccess) {
    return (
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
    );
  }
  return (
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
          <Popover
            isOpen={isConfirmPaymentOpen}
            onClose={onConfirmPaymentClose}
          >
            <PopoverTrigger>
              <Button
                mt={4}
                colorScheme="purple"
                onClick={onConfirmPaymentOpen}
                loading={paymentMutation.isLoading}
                loadingText="Laddar"
              >
                Bekräfta
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverBody>Har du swishat?</PopoverBody>
              <PopoverFooter
                border="0"
                d="flex"
                alignItems="center"
                justifyContent="center"
                pb={4}
              >
                <Button
                  colorScheme="purple"
                  onClick={() => {
                    onConfirmPaymentClose();
                    onConfirmPayment();
                  }}
                >
                  Ja
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </MotionBox>
      )}
    </Box>
  );
};

export default PaymentTab;

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
