import axios from 'axios';
import {
  CreateProductDto,
  CreateInstanceDto,
  Payment,
  Person,
  Purchase,
  CreatePersonDto,
  Instance,
  CreateProductCategoryDto,
  ProductCategory,
  UpdateProductDto,
  CreateMultiPurchaseDto,
} from '../types';

const apiBaseUrl = 'https://streckapp.onrender.com';

const authHttpClient = axios.create({
  baseURL: apiBaseUrl,
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

export const updateProduct = async (product: UpdateProductDto) => {
  return authHttpClient.put(`products/${product._id}`, product);
};

export const deleteProduct = async (productId: string) => {
  return authHttpClient.delete(`products/${productId}`);
};

export const addProductCategory = async (
  productCategory: CreateProductCategoryDto,
) => {
  return authHttpClient.post(`product-categories`, productCategory);
};

export const updateProductCategory = async (
  productCategory: ProductCategory,
) => {
  return authHttpClient.put(
    `product-categories/${productCategory._id}`,
    productCategory,
  );
};

export const deleteProductCategory = async (productCategoryId: string) => {
  return authHttpClient.delete(`product-categories/${productCategoryId}`);
};

export const getPayments = async (
  instanceId?: string,
  limit = 100,
  page = 1,
): Promise<{ total: number; payments: Payment[] }> => {
  const response = await authHttpClient.get('payments', {
    params: { ...(instanceId && { instance: instanceId }), limit, page },
  });
  return response.data;
};

export const getPurchases = async (
  instanceId?: string,
  limit = 100,
  page = 1,
): Promise<{ total: number; purchases: Purchase[] }> => {
  const response = await authHttpClient.get('purchases', {
    params: { ...(instanceId && { instance: instanceId }), limit, page },
  });
  return response.data;
};

export const makeMultiPurchase = async (
  multiPurchase: CreateMultiPurchaseDto,
) => {
  return authHttpClient.post(`purchases/multi`, multiPurchase);
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
  return axios
    .post(`${apiBaseUrl}/auth/login`, request)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        throw Error('Användarnamnet och/eller lösenordet stämmer inte');
      }
    });
};
