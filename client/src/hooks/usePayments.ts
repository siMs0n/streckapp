import { useState } from 'react';
import { useQuery } from 'react-query';
import { getPayments } from '../api/admin-api-methods';
import useCurrentInstance from './useCurrentInstance';

export default function usePayments() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { instance } = useCurrentInstance();
  const { data } = useQuery(
    ['payments', instance?._id, page],
    () => getPayments(instance?._id, limit, page),
    {
      enabled: !!instance?._id,
      keepPreviousData: true,
    },
  );
  /* const addPaymentMutation = useMutation(addPayment, {
    onSuccess: () => {
      queryClient.invalidateQueries('payments');
      toast({
        description: 'Betalning skapad',
        status: 'success',
      });
    },
  });
  const deletePaymentMutation = useMutation(deletePayment, {
    onSuccess: () => {
      queryClient.invalidateQueries('payments');
      toast({
        description: 'Betalning borttagen',
        status: 'success',
      });
    },
  });
  const updatePaymentMutation = useMutation(updatePayment, {
    onSuccess: () => {
      queryClient.invalidateQueries('payments');
      toast({
        description: 'Betalning uppdaterad',
        status: 'success',
      });
    },
  }); */

  /* const handleAddPayment = useCallback(
    (PaymentToAdd: Omit<CreatePaymentDto, 'instance'>) => {
      if (instance?._id)
        addPaymentMutation.mutate({ ...PaymentToAdd, instance: instance?._id });
    },
    [addPaymentMutation, instance?._id],
  );

  const handleUpdatePayment = useCallback(
    (Payment: Payment) => {
      updatePaymentMutation.mutate(Payment);
    },
    [updatePaymentMutation],
  );

  const handleDeletePayment = useCallback(
    (PaymentId: string) => {
      deletePaymentMutation.mutate(PaymentId);
    },
    [deletePaymentMutation],
  ); */

  return {
    payments: data?.payments || [],
    total: data?.total || 0,
    limit,
    setLimit,
    page,
    setPage,
    /* addPayment: handleAddPayment,
    updatePayment: handleUpdatePayment,
    deletePayment: handleDeletePayment, */
  };
}
