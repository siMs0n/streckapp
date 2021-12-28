import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { addInstance } from '../../api/admin-api-methods';
import { getInstances } from '../../api/api-methods';
import { getAdminInstanceUrl } from '../../routes/paths';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const defaultValues = {
  name: '',
  year: new Date().getFullYear(),
  swishPhoneNumber: null,
  pin: null,
};

interface CreateInstanceFormInputs {
  name: string;
  year: number;
  swishPhoneNumber: string | null;
  pin: string | null;
}

const schema: yup.SchemaOf<CreateInstanceFormInputs> = yup
  .object()
  .shape({
    name: yup
      .string()
      .required('Du måste ange ett namn')
      .min(2, 'Namnet måste innehålla minst två bokstäver'),
    year: yup
      .number()
      .required('Du måste ange ett år')
      .typeError('Du måste ange ett år')
      .integer('Du måste ange ett år')
      .min(2000, 'Året måste vara efter 2000')
      .max(2040, 'Året måste vara innan 2040'),
    swishPhoneNumber: yup
      .string()
      .optional()
      .nullable()
      .length(10, 'Swishnumret måste vara 10 siffror')
      .matches(/^([0-9])+$/, 'Ange ett giltigt telefonnummer utan riktnummer'),
    pin: yup
      .string()
      .optional()
      .nullable()
      .length(4, 'Pinkoden måste vara exakt 4 siffror')
      .matches(/^([0-9])+$/, 'Pinkoden måste vara exakt 4 siffror'),
  })
  .defined();

export default function AdminInstancesPage() {
  const { data: instances } = useQuery('instances', getInstances);
  const history = useHistory();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateInstanceFormInputs>({
    defaultValues,
    resolver: yupResolver(schema),
  });

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
  }: CreateInstanceFormInputs) => {
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
        <Box>
          <Box borderWidth="1px" borderRadius="lg" p={4}>
            <Heading as="h2" size="md" mb={4}>
              Lägg till nytt spex
            </Heading>
            <Text>Name</Text>
            <Input mt={4} mb={2} {...register('name')}></Input>
            {errors?.name && (
              <Text color="tomato" mb={2}>
                {errors?.name?.message}
              </Text>
            )}
            <Text>Year</Text>
            <Input mt={4} mb={2} type="number" {...register('year')}></Input>
            {errors?.year && (
              <Text color="tomato" mb={2}>
                {errors?.year?.message}
              </Text>
            )}
            <Text>Swishnummer</Text>
            <Input
              mt={4}
              mb={2}
              type="tel"
              {...register('swishPhoneNumber')}
            ></Input>
            {errors?.swishPhoneNumber && (
              <Text color="tomato" mb={2}>
                {errors?.swishPhoneNumber?.message}
              </Text>
            )}
            <Text mt={6}>Pinkod</Text>
            <Input mt={4} mb={2} {...register('pin')}></Input>
            {errors?.pin && (
              <Text color="tomato" mb={2}>
                {errors?.pin?.message}
              </Text>
            )}
            <Button
              mt={6}
              onClick={handleSubmit(onCreateInstance)}
              colorScheme="purple"
            >
              Spara
            </Button>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
