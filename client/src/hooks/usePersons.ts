import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addPerson,
  deletePerson,
  updatePerson,
} from '../api/admin-api-methods';
import { getPersons } from '../api/api-methods';
import { Person } from '../types';
import useCurrentInstance from './useCurrentInstance';

export default function usePersons() {
  const { instance } = useCurrentInstance();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data } = useQuery(
    ['persons', instance?._id],
    () => getPersons(instance?._id),
    {
      enabled: !!instance?._id,
    },
  );
  const addPersonMutation = useMutation(addPerson, {
    onSuccess: () => {
      queryClient.invalidateQueries('persons');
    },
  });
  const deletePersonMutation = useMutation(deletePerson, {
    onSuccess: () => {
      queryClient.invalidateQueries('persons');
      toast({
        description: 'Användare borttagen',
        status: 'success',
      });
    },
  });
  const updatePersonMutation = useMutation(updatePerson, {
    onSuccess: () => {
      queryClient.invalidateQueries('persons');
      toast({
        description: 'Användare uppdaterad',
        status: 'success',
      });
    },
  });

  const handleAddPerson = useCallback(
    (name: string) => {
      if (instance?._id)
        addPersonMutation.mutate({ name, balance: 0, instance: instance?._id });
    },
    [addPersonMutation, instance?._id],
  );

  const handleUpdatePerson = useCallback(
    (person: Person) => {
      updatePersonMutation.mutate(person);
    },
    [updatePersonMutation],
  );

  const handleDeletePerson = useCallback(
    (personId: string) => {
      deletePersonMutation.mutate(personId);
    },
    [deletePersonMutation],
  );

  return {
    persons: data,
    addPerson: handleAddPerson,
    updatePerson: handleUpdatePerson,
    deletePerson: handleDeletePerson,
  };
}
