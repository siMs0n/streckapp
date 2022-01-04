import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { adminLogin } from '../api/api-methods';
import useAdminAuth from '../hooks/useAdminAuth';
import { adminBaseInstanceUrl } from '../routes/paths';

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const loginMutation = useMutation(adminLogin, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      history.push('/admin');
    },
  });
  const history = useHistory();
  const adminAuth = useAdminAuth();

  useEffect(() => {
    if (!adminAuth.isLoading && adminAuth.authorized) {
      history.push(adminBaseInstanceUrl);
    }
  }, [adminAuth, history]);

  function validateUserName(value: string) {
    if (!value) {
      return 'Du måste ange ett användarnamn';
    } else return true;
  }

  function validatePassword(value: string) {
    if (!value) {
      return 'Du måste ange ett lösenord';
    } else if (value.length < 4) {
      return 'Lösenordet måste vara minst 4 tecken långt';
    } else return true;
  }

  function onSubmit(values: { username: string; password: string }) {
    return loginMutation.mutate(values);
  }

  return (
    <Container centerContent>
      <Box mt={8} p={8} boxShadow="xl" rounded="lg" w="100%" maxW="400px">
        <Heading as="h1" size="2xl" mt="8">
          Logga in
        </Heading>
        <Box mt={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.username}>
              <FormLabel htmlFor="username">Användarnamn</FormLabel>
              <Input
                placeholder="Användarnamn"
                {...register('username', { validate: validateUserName })}
              />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} mt={4}>
              <FormLabel htmlFor="password">Lösenord</FormLabel>
              <Input
                type="password"
                placeholder="********"
                {...register('password', { validate: validatePassword })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={8}
              colorScheme="purple"
              isLoading={isSubmitting}
              type="submit"
            >
              Logga in
            </Button>
            {loginMutation.isError && (
              <Box mt={4}>
                <Text color="red.500">
                  {isError(loginMutation.error) && loginMutation.error.message}
                </Text>
              </Box>
            )}
          </form>
        </Box>
      </Box>
    </Container>
  );
}

function isError(error: unknown): error is Error {
  return error instanceof Error;
}
