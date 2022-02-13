import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  addProduct,
  deleteProduct,
  updateProduct,
} from '../api/admin-api-methods';
import { getProducts } from '../api/api-methods';
import { CreateProductDto, UpdateProductDto } from '../types';
import useCurrentInstance from './useCurrentInstance';

export default function useProducts() {
  const { instance } = useCurrentInstance();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data } = useQuery(
    ['products', instance?._id],
    () => getProducts(instance?._id),
    {
      enabled: !!instance?._id,
    },
  );
  const addProductMutation = useMutation(addProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast({
        description: 'Produkt skapad',
        status: 'success',
      });
    },
  });
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast({
        description: 'Produkt borttagen',
        status: 'success',
      });
    },
  });
  const updateProductMutation = useMutation(updateProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
      toast({
        description: 'Produkt uppdaterad',
        status: 'success',
      });
    },
  });

  const handleAddProduct = useCallback(
    (productToAdd: Omit<CreateProductDto, 'instance'>) => {
      if (instance?._id)
        addProductMutation.mutate({ ...productToAdd, instance: instance?._id });
    },
    [addProductMutation, instance?._id],
  );

  const handleUpdateProduct = useCallback(
    (product: UpdateProductDto) => {
      updateProductMutation.mutate(product);
    },
    [updateProductMutation],
  );

  const handleDeleteProduct = useCallback(
    (productId: string) => {
      deleteProductMutation.mutate(productId);
    },
    [deleteProductMutation],
  );

  return {
    products: data,
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
  };
}
