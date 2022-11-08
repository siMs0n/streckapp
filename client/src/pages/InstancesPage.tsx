import { Box, Container, Heading, VStack, Text, Link } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { getInstances } from '../api/api-methods';
import { getInstanceUrl, getPinUrl, loginUrl } from '../routes/paths';
import { Instance } from '../types';
import { useShowSpinner } from '../hooks/useShowSpinner';
import { FetchingDataSpinner } from '../components/FetchingDataSpinner';

export default function InstancesPage() {
  const { data: instances } = useQuery('instances', getInstances, {
    retry: false,
  });
  const showSpinner = useShowSpinner(!!instances);
  const history = useHistory();

  const onSelectInstance = (instance: Instance) => {
    const localPin = localStorage.getItem(`${instance._id}/pin`);
    if (instance.pin && localPin !== instance.pin) {
      history.push(getPinUrl(instance._id));
    } else {
      history.push(getInstanceUrl(instance._id));
    }
  };

  //Show spinner if server is cold starting and takes extra long to load
  if (showSpinner) {
    return <FetchingDataSpinner />;
  }

  return (
    <Container
      paddingTop="150px"
      paddingBottom="20px"
      maxW={600}
      height="100vh"
    >
      <VStack justifyContent="space-between" alignItems="stretch" height="100%">
        <Box>
          <Heading mb={4}>Välj spex</Heading>
          <VStack>
            {instances?.map((instance) => (
              <Box
                key={instance._id}
                borderWidth="1px"
                borderRadius="lg"
                p={3}
                width="100%"
                height="max-content"
                cursor="pointer"
                onClick={() => onSelectInstance(instance)}
              >
                <Heading as="h2" size="md" mb={2}>
                  {instance.name}
                </Heading>
                <Text>{instance.year}</Text>
              </Box>
            ))}
          </VStack>
        </Box>
        <Text mt={12}>
          Eller logga in{' '}
          <Link as={RouterLink} to={loginUrl} textDecoration="underline">
            här
          </Link>{' '}
          om du är admin
        </Text>
      </VStack>
    </Container>
  );
}
