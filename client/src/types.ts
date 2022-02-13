export interface Product {
  _id: string;
  name: string;
  price: number;
  category: ProductCategory;
  available: boolean;
  instance: string;
}

export interface Person {
  _id: string;
  name: string;
  balance: number;
}

export interface ProductCategory {
  _id: string;
  name: string;
}

export interface CreatePersonDto {
  name: string;
  balance: number;
  instance: string;
}

export interface CreatePurchaseDto {
  quantity: number;
  product: string;
  person: string;
  instance: string;
}

export interface CreatePaymentDto {
  amount: number;
  reference: string;
  person: string;
  instance: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  available: boolean;
  category: string;
  instance: string;
}

export type UpdateProductDto = CreateProductDto & { _id: string };

export interface CreateProductCategoryDto {
  name: string;
  instance: string;
}

export interface Settings {
  pin?: string;
  swishPhoneNumber?: string;
}

export interface Payment {
  _id: string;
  amount: number;
  reference: string;
  person?: Person;
  createdAt: string;
  updatedAt: string;
}

export interface Purchase {
  _id: string;
  amount: number;
  unitPrice: number;
  quantity: number;
  person?: Person;
  product?: Product;
  createdAt: string;
  updatedAt: string;
}

export interface Instance {
  _id: string;
  name: string;
  year: number;
  pin?: string | null;
  swishPhoneNumber?: string;
}

export interface CreateInstanceDto {
  name: string;
  year: number;
  pin?: string;
  swishPhoneNumber?: string;
}
