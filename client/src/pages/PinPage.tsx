import {
  Container,
  Flex,
  Heading,
  HStack,
  Link,
  PinInput,
  PinInputField,
  Text,
} from '@chakra-ui/react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { loginUrl, getHomeUrl } from '../routes/paths';
import useCurrentInstance from '../hooks/useCurrentInstance';

export default function PinPage() {
  const { instance } = useCurrentInstance();
  const history = useHistory();
  const onChangePin = (pin: string) => {
    if (pin && pin === instance?.pin) {
      localStorage.setItem(`${instance._id}/pin`, pin);
      history.push(getHomeUrl(instance._id));
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
        <HStack>
          <PinInput size="lg" onComplete={onChangePin}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
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
