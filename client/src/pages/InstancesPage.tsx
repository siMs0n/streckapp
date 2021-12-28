import { Box, Container, Heading, VStack, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { getInstances } from '../api/api-methods';
import { getInstanceUrl, getPinUrl } from '../routes/paths';
import { Instance } from '../types';

export default function InstancesPage() {
  const { data: instances } = useQuery('instances', getInstances, {
    retry: false,
  });
  const history = useHistory();

  const onSelectInstance = (instance: Instance) => {
    if (instance.pin) {
      history.push(getPinUrl(instance._id));
    } else {
      history.push(getInstanceUrl(instance._id));
    }
  };

  return (
    <Container paddingTop="150px" pl={8} maxW={1600}>
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
    </Container>
  );
}
