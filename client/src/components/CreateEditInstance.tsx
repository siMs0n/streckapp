import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Instance } from '../types';

const defaultValues = {
  name: '',
  year: new Date().getFullYear(),
  swishPhoneNumber: '',
  pin: null,
};

export interface InstanceFormInputs {
  name: string;
  year: number;
  swishPhoneNumber: string;
  pin: string | null;
}

const schema: yup.SchemaOf<InstanceFormInputs> = yup
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
      .required('Du måste ange ett swishnummer')
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

export default function CreateEditInstance({
  instance,
  onSave,
}: {
  instance?: Instance;
  onSave: (inputs: InstanceFormInputs) => void;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<InstanceFormInputs>({
    defaultValues: instance
      ? { ...instance, pin: instance.pin ?? null }
      : defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading as="h2" size="md" mb={4}>
        {instance ? 'Redigera spex' : 'Lägg till nytt spex'}
      </Heading>
      <Text>Namn</Text>
      <Input mt={4} mb={2} {...register('name')}></Input>
      {errors?.name && (
        <Text color="tomato" mb={2}>
          {errors?.name?.message}
        </Text>
      )}
      <Text>År</Text>
      <Input mt={4} mb={2} type="number" {...register('year')}></Input>
      {errors?.year && (
        <Text color="tomato" mb={2}>
          {errors?.year?.message}
        </Text>
      )}
      <Text>Swishnummer</Text>
      <Input mt={4} mb={2} type="tel" {...register('swishPhoneNumber')}></Input>
      {errors?.swishPhoneNumber && (
        <Text color="tomato" mb={2}>
          {errors?.swishPhoneNumber?.message}
        </Text>
      )}
      <Text mt={6}>Pinkod</Text>
      <Input
        mt={4}
        mb={2}
        {...register('pin', { setValueAs: (val) => (val === '' ? null : val) })}
      ></Input>
      {errors?.pin && (
        <Text color="tomato" mb={2}>
          {errors?.pin?.message}
        </Text>
      )}
      <Button mt={6} onClick={handleSubmit(onSave)} colorScheme="purple">
        Spara
      </Button>
    </Box>
  );
}
