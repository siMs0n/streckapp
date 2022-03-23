import { useState } from 'react';
import { useQuery } from 'react-query';
import { getPurchases } from '../api/admin-api-methods';
import useCurrentInstance from './useCurrentInstance';

export default function usePurchases() {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { instance } = useCurrentInstance();
  const { data } = useQuery(
    ['purchases', instance?._id, page],
    () => getPurchases(instance?._id, limit, page),
    {
      enabled: !!instance?._id,
      keepPreviousData: true,
    },
  );
  /* const addPurchaseMutation = useMutation(addPurchase, {
    onSuccess: () => {
      queryClient.invalidateQueries('purchases');
      toast({
        description: 'Streck skapat',
        status: 'success',
      });
    },
  });
  const deletePurchaseMutation = useMutation(deletePurchase, {
    onSuccess: () => {
      queryClient.invalidateQueries('purchases');
      toast({
        description: 'Streck borttaget',
        status: 'success',
      });
    },
  });
  const updatePurchaseMutation = useMutation(updatePurchase, {
    onSuccess: () => {
      queryClient.invalidateQueries('purchases');
      toast({
        description: 'Streck uppdaterat',
        status: 'success',
      });
    },
  }); */

  /* const handleAddPurchase = useCallback(
    (PurchaseToAdd: Omit<CreatePurchaseDto, 'instance'>) => {
      if (instance?._id)
        addPurchaseMutation.mutate({ ...PurchaseToAdd, instance: instance?._id });
    },
    [addPurchaseMutation, instance?._id],
  );

  const handleUpdatePurchase = useCallback(
    (Purchase: Purchase) => {
      updatePurchaseMutation.mutate(Purchase);
    },
    [updatePurchaseMutation],
  );

  const handleDeletePurchase = useCallback(
    (PurchaseId: string) => {
      deletePurchaseMutation.mutate(PurchaseId);
    },
    [deletePurchaseMutation],
  ); */

  return {
    purchases: data?.purchases || [],
    total: data?.total || 0,
    limit,
    setLimit,
    page,
    setPage,
    /* addPurchase: handleAddPurchase,
    updatePurchase: handleUpdatePurchase,
    deletePurchase: handleDeletePurchase, */
  };
}
