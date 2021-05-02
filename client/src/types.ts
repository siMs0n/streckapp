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
  productId: string;
  personId: string;
}

export interface CreatePaymentDto {
  amount: number;
  reference: string;
  personId: string;
}

export interface Settings {
  pin: string;
  swishNumber: string;
}
