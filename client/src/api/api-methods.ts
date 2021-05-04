import axios from 'axios';
import {
  CreatePaymentDto,
  CreatePurchaseDto,
  Person,
  Product,
  Settings,
} from '../types';

const httpClient = axios.create({
  baseURL: 'http://localhost:4000', //'https://streckapp.herokuapp.com/',
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await httpClient.get('products');
  return response.data;
};

export const getPersons = async (): Promise<Person[]> => {
  const response = await httpClient.get('persons');
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
