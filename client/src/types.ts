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
  pin: string;
  swishNumber: string;
}

export interface Payment {
  _id: string;
  amount: number;
  reference: string;
  person: Person;
  createdAt: string;
  updatedAt: string;
}
