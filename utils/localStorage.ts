import { Product } from "@/lib/types/products";

const PRODUCTS_KEY = 'products';

export const getProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const addProduct = (product: Product) => {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
};

export const updateProduct = (updatedProduct: Product) => {
  const products = getProducts().map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
  saveProducts(products);
};

export const deleteProduct = (id: string) => {
  const products = getProducts().filter((product) => product.id !== id);
  saveProducts(products);
};
