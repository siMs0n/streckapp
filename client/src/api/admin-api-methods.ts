import axios from 'axios';
import {
  CreateProductDto,
  CreateInstanceDto,
  Payment,
  Person,
  Product,
  Purchase,
  CreatePersonDto,
  Instance,
} from '../types';

const authHttpClient = axios.create({
  baseURL: 'https://streckapp.herokuapp.com/',
});

authHttpClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

authHttpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      return error;
    }
    Promise.reject(error);
  },
);

export const isAdmin = async () => {
  const response = await authHttpClient.get('is-logged-in');
  return response.data;
};

export const addPerson = async (person: CreatePersonDto) => {
  return authHttpClient.post(`persons`, person);
};

export const updatePerson = async (person: Person) => {
  return authHttpClient.put(`persons/${person._id}`, person);
};

export const deletePerson = async (personId: string) => {
  return authHttpClient.delete(`persons/${personId}`);
};

export const addProduct = async (product: CreateProductDto) => {
  return authHttpClient.post(`products`, product);
};

export const updateProduct = async (product: Product) => {
  return authHttpClient.put(`products/${product._id}`, product);
};

export const deleteProduct = async (productId: string) => {
  return authHttpClient.delete(`products/${productId}`);
};

export const getPayments = async (instanceId?: string): Promise<Payment[]> => {
  const response = await authHttpClient.get('payments', {
    params: { ...(instanceId && { instance: instanceId }) },
  });
  return response.data;
};

export const getPurchases = async (
  instanceId?: string,
): Promise<Purchase[]> => {
  const response = await authHttpClient.get('purchases', {
    params: { ...(instanceId && { instance: instanceId }) },
  });
  return response.data;
};

export const addInstance = async (instance: CreateInstanceDto) => {
  return authHttpClient.post(`instances`, instance);
};

export const updateInstance = async (instance: Instance) => {
  return authHttpClient.put(`instances/${instance._id}`, instance);
};

export const deleteInstance = async (instanceId: string) => {
  return authHttpClient.delete(`instances/${instanceId}`);
};
