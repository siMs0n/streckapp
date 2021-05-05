import { Container, Flex, Heading, Input, Link, Text } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { getSettings } from '../api/api-methods';
import { loginUrl } from '../routes/paths';

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
        <Heading size="lg" my={16}>
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
        <Text mt={12}>
          Eller logga in{' '}
          <Link as={RouterLink} to={loginUrl} textDecoration="underline">
            här
          </Link>{' '}
          om du är admin
        </Text>
      </Flex>
    </Container>
  );
}
