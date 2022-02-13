import axios from 'axios';
import {
  CreatePaymentDto,
  CreatePurchaseDto,
  Person,
  Product,
  Settings,
  Instance,
  ProductCategory,
} from '../types';

const httpClient = axios.create({
  baseURL: 'https://streckapp.herokuapp.com/',
});

export const getProducts = async (instanceId?: string): Promise<Product[]> => {
  const response = await httpClient.get('products', {
    params: { ...(instanceId && { instance: instanceId }) },
  });
  return response.data;
};

export const getProductCategories = async (
  instanceId?: string,
): Promise<ProductCategory[]> => {
  const response = await httpClient.get('product-categories', {
    params: { ...(instanceId && { instance: instanceId }) },
  });
  return response.data;
};

export const getPersons = async (instanceId?: string): Promise<Person[]> => {
  const response = await httpClient.get('persons', {
    params: { ...(instanceId && { instance: instanceId }) },
  });
  return response.data;
};

export const makePurchase = async (purchase: CreatePurchaseDto) => {
  return httpClient.post(`purchases`, purchase);
};

export const makePayment = async (payment: CreatePaymentDto) => {
  return httpClient.post(`payments`, payment);
};

export const getSettings = async (): Promise<Settings> => {
  const response = await httpClient.get('settings');
  return response.data;
};

export const getInstances = async (): Promise<Instance[]> => {
  const response = await httpClient.get('instances');
  return response.data;
};

export const getInstance = async (instanceId: string): Promise<Instance> => {
  const response = await httpClient.get(`instances/${instanceId}`);
  return response.data;
};

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

export const adminLogin = async (
  request: LoginRequest,
): Promise<LoginResponse> => {
  return httpClient
    .post(`auth/login`, request)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        throw Error('Användarnamnet och/eller lösenordet stämmer inte');
      }
    });
};
