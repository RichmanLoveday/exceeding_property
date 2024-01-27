export type AddProductProps = {
  _id?: number | string;
  stock: number;
  name: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  discountPrice: number;
};

export type ProductProps = {
  stock: string | number;
  _id: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  price: string | number;
  discountPrice: string | number;
  createdAt: string;
  updatedAt: string;
};

export type UserProps = {
  _id: string;
  username: string;
  email: string;
  token: string;
};

export interface OrderProps {
  _id: string;
  products: Product[];
  user: string;
  address: string;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  deliveryType: string;
  deliveryStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Product {
  product: string;
  quantity: number;
  _id: string;
}

export interface ProductRow {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  stock: number;
  price: number;
  images: any[]; // Assuming image is an array of strings
}

export interface ProductRowProps {
  products: ProductRow;
}
