import { Box, Container, Flex, Heading, useToast } from '@chakra-ui/react';
import React from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { updateInstance } from '../../api/admin-api-methods';
import AdminInstanceHeader from '../../components/AdminInstanceHeader';
import AdminMenu from '../../components/AdminMenu';
import CreateEditInstance, {
  InstanceFormInputs,
} from '../../components/CreateEditInstance';
import useCurrentInstance from '../../hooks/useCurrentInstance';

export default function SettingsPage() {
  const { instance } = useCurrentInstance();

  const toast = useToast();

  const queryClient = useQueryClient();
  const updateInstanceMutation = useMutation(updateInstance, {
    onSuccess: () => {
      queryClient.invalidateQueries('instances');
      toast({
        description: 'Spex uppdaterat',
        status: 'success',
      });
    },
  });

  const onSaveInstance = ({
    name,
    year,
    swishPhoneNumber,
    pin,
  }: InstanceFormInputs) => {
    if (!instance) return;
    const instanceToSave = {
      _id: instance._id,
      name,
      year,
      swishPhoneNumber,
      pin,
    };
    updateInstanceMutation.mutate(instanceToSave);
  };

  return (
    <Container pt={{ base: 2, md: '50px' }} pl={{ base: 2, md: 8 }} maxW={1600}>
      <AdminInstanceHeader />
      <Flex pt={{ base: 2, md: '100px' }} flexDirection="column">
        <Heading mb={4} ml={{ base: 0, md: '200px' }}>
          Streck
        </Heading>
        <Flex flexDirection={{ base: 'column', md: 'row' }}>
          <Box w={{ base: 'auto', md: 200 }}>
            <AdminMenu />
          </Box>
          <Box mr={{ base: 0, md: 8 }}>
            {instance && (
              <CreateEditInstance instance={instance} onSave={onSaveInstance} />
            )}
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
}
