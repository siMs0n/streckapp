import axios from 'axios';
import { CreatePurchaseDto, Person, Product } from '../types';

const httpClient = axios.create({
  baseURL: 'https://streckapp.herokuapp.com/',
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
