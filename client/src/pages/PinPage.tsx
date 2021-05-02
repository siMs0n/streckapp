import { Container, Flex, Heading, Input } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router';
import { getSettings } from '../api/api-methods';

export default function PinPage() {
  const { data: settings } = useQuery('settings', getSettings);
  const history = useHistory();
  const onChangePin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pin = (event.target as HTMLInputElement).value;
    if (pin && pin === settings?.pin) {
      localStorage.setItem('pin', pin);
      history.push('/');
    }
  };
  return (
    <Container centerContent maxW={600}>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Heading size="lg" mb={16}>
          Ange pinkoden för att logga in
        </Heading>
        <Input
          placeholder="****"
          textAlign="center"
          onChange={onChangePin}
          width={200}
          type="number"
          fontSize="large"
        />
      </Flex>
    </Container>
  );
}
