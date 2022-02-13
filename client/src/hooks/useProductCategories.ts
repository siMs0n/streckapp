import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addProductCategory,
  deleteProductCategory,
  updateProductCategory,
} from '../api/admin-api-methods';
import { getProductCategories } from '../api/api-methods';
import { CreateProductCategoryDto, ProductCategory } from '../types';
import useCurrentInstance from './useCurrentInstance';

export default function useProductCategories() {
  const { instance } = useCurrentInstance();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data } = useQuery(
    ['productCategories', instance?._id],
    () => getProductCategories(instance?._id),
    {
      enabled: !!instance?._id,
    },
  );
  const addProductCategoryMutation = useMutation(addProductCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('productCategories');
      toast({
        description: 'Kategori skapad',
        status: 'success',
      });
    },
  });
  const deleteProductCategoryMutation = useMutation(deleteProductCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('productCategories');
      toast({
        description: 'Kategori borttagen',
        status: 'success',
      });
    },
  });
  const updateProductCategoryMutation = useMutation(updateProductCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('productCategories');
      toast({
        description: 'Kategori uppdaterad',
        status: 'success',
      });
    },
  });

  const handleAddProductCategory = useCallback(
    (productCategoryToAdd: Omit<CreateProductCategoryDto, 'instance'>) => {
      if (instance?._id)
        addProductCategoryMutation.mutate({
          ...productCategoryToAdd,
          instance: instance?._id,
        });
    },
    [addProductCategoryMutation, instance?._id],
  );

  const handleUpdateProductCategory = useCallback(
    (product: ProductCategory) => {
      updateProductCategoryMutation.mutate(product);
    },
    [updateProductCategoryMutation],
  );

  const handleDeleteProductCategory = useCallback(
    (productId: string) => {
      deleteProductCategoryMutation.mutate(productId);
    },
    [deleteProductCategoryMutation],
  );

  return {
    productCategories: data ?? [],
    addProductCategory: handleAddProductCategory,
    updateProductCategory: handleUpdateProductCategory,
    deleteProductCategory: handleDeleteProductCategory,
  };
}
