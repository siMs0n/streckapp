import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { saveSettings } from '../../api/admin-api-methods';
import { getSettings } from '../../api/api-methods';
import AdminMenu from '../../components/AdminMenu';

export default function SettingsPage() {
  const { data } = useQuery('settings', getSettings, {
    retry: false,
  });
  const [swishPhoneNumber, setSwishPhoneNumber] = useState('');
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (data) {
      setSwishPhoneNumber(data.swishPhoneNumber || '');
      setPin(data.pin || '');
    }
  }, [data]);

  const onSaveSettings = () => {
    if (swishPhoneNumber && swishPhoneNumber.length !== 10) {
      return;
    }
    if (pin && pin.length !== 4) {
      return;
    }
    saveSettings({ pin, swishPhoneNumber });
  };

  return (
    <Container paddingTop="150px" pl={8} maxW={1600}>
      <Heading mb={4} ml="200px">
        Inställningar
      </Heading>
      <Flex>
        <Box w={200}>
          <AdminMenu />
        </Box>
        <Box mr={8}>
          <Box borderWidth="1px" borderRadius="lg" p={4}>
            <Text>Swishnummer</Text>
            <Input
              mt={4}
              mb={2}
              value={swishPhoneNumber}
              onChange={(e) => setSwishPhoneNumber(e.target.value)}
            ></Input>
            {swishPhoneNumber &&
              (swishPhoneNumber.length !== 10 ||
                !swishPhoneNumber.match(/^[0-9]*$/)) && (
                <Text>Mobilnumret måste vara 10 siffor</Text>
              )}
            <Text mt={6}>Pinkod</Text>
            <Input
              mt={4}
              mb={2}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            ></Input>
            {pin && (pin.length > 4 || !pin.match(/^[0-9]*$/)) && (
              <Text>Pinkoden måste vara fyra siffror</Text>
            )}
            <Button mt={6} onClick={onSaveSettings} colorScheme="purple">
              Spara
            </Button>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
