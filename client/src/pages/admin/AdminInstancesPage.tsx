import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { addInstance } from '../../api/admin-api-methods';
import { getInstances } from '../../api/api-methods';
import CreateEditInstance, {
  InstanceFormInputs,
} from '../../components/CreateEditInstance';
import { getAdminInstanceUrl } from '../../routes/paths';

export default function AdminInstancesPage() {
  const { data: instances } = useQuery('instances', getInstances);
  const history = useHistory();
  const toast = useToast();

  const queryClient = useQueryClient();
  const addInstanceMutation = useMutation(addInstance, {
    onSuccess: () => {
      queryClient.invalidateQueries('instances');
      toast({
        description: 'Spex skapat',
        status: 'success',
      });
    },
  });

  const onCreateInstance = ({
    name,
    year,
    swishPhoneNumber,
    pin,
  }: InstanceFormInputs) => {
    const instanceToAdd = {
      name,
      year,
      ...(swishPhoneNumber && { swishPhoneNumber }),
      ...(pin && { pin }),
    };
    addInstanceMutation.mutate(instanceToAdd);
  };

  const onSelectInstance = (id: string) => {
    history.push(getAdminInstanceUrl(id));
  };

  return (
    <Container paddingTop="150px" pl={8} maxW={1600}>
      <Heading mb={4} ml="200px">
        Välj spex
      </Heading>
      <Flex ml={200}>
        <Box mr={8} w={200}>
          {instances?.map((instance) => (
            <Box
              key={instance._id}
              borderWidth="1px"
              borderRadius="lg"
              p={2}
              height="max-content"
              cursor="pointer"
              onClick={() => onSelectInstance(instance._id)}
            >
              <Heading as="h2" size="md">
                {instance.name}
              </Heading>
              <Text>{instance.year}</Text>
            </Box>
          ))}
        </Box>
        <CreateEditInstance onSave={onCreateInstance} />
      </Flex>
    </Container>
  );
}
