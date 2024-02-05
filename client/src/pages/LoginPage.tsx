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
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { adminLogin } from '../api/admin-api-methods';
import useAdminAuth from '../hooks/useAdminAuth';
import { adminBaseInstanceUrl } from '../routes/paths';
import { useShowSpinner } from '../hooks/useShowSpinner';
import { FetchingDataSpinner } from '../components/FetchingDataSpinner';

export default function LoginPage() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<{ username: string; password: string }>();
  const loginMutation = useMutation(adminLogin, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.access_token);
      navigate('/admin');
    },
  });
  const navigate = useNavigate();
  const adminAuth = useAdminAuth();
  const showSpinner = useShowSpinner(!adminAuth.isLoading);

  useEffect(() => {
    if (!adminAuth.isLoading && adminAuth.authorized) {
      navigate(adminBaseInstanceUrl);
    }
  }, [adminAuth, navigate]);

  function onSubmit(values: { username: string; password: string }) {
    return loginMutation.mutate(values);
  }

  //Show spinner if server is cold starting and takes extra long to load
  if (showSpinner) {
    return <FetchingDataSpinner />;
  }

  return (
    <Container centerContent>
      <Box mt={8} p={8} boxShadow="xl" rounded="lg" w="100%" maxW="400px">
        <Heading as="h1" size="2xl" mt="8">
          Logga in
        </Heading>
        <Box mt={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={Boolean(errors.username)}>
              <FormLabel htmlFor="username">Användarnamn</FormLabel>
              <Input
                placeholder="Användarnamn"
                {...register('username', {
                  required: 'Du måste ange ett användarnamn',
                })}
              />

              <FormErrorMessage>
                {errors.username?.message?.toString()}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)} mt={4}>
              <FormLabel htmlFor="password">Lösenord</FormLabel>
              <Input
                type="password"
                placeholder="********"
                {...register('password', {
                  required: 'Du måste ange ett lösenord',
                  minLength: {
                    value: 4,
                    message: 'Lösenordet måste vara minst 4 tecken långt',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password?.message?.toString()}
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
