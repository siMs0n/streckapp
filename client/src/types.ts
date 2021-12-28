export interface Product {
  _id: string;
  name: string;
  price: number;
  available: boolean;
}

export interface Person {
  _id: string;
  name: string;
  balance: number;
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
}

export interface CreatePaymentDto {
  amount: number;
  reference: string;
  person: string;
}

export interface CreateProductDto {
  name: string;
  price: number;
  available: boolean;
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
  pin?: string;
  swishPhoneNumber?: string;
}

export interface CreateInstanceDto {
  name: string;
  year: number;
  pin?: string;
  swishPhoneNumber?: string;
}
