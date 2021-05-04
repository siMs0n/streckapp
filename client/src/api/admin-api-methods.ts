import axios from 'axios';
import { CreateProductDto, Payment } from '../types';

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

export const addPerson = async (name: string) => {
  return authHttpClient.post(`persons`, { name, balance: 0 });
};

export const addProduct = async (product: CreateProductDto) => {
  return authHttpClient.post(`products`, product);
};

export const getPayments = async (): Promise<Payment[]> => {
  const response = await authHttpClient.get('payments');
  return response.data;
};
