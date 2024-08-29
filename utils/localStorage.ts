import { Product } from "@/lib/types/products";
import { uploadImageToCloudinary } from "@/utils/cloudinary";

const PRODUCTS_KEY = 'products';

export const getProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const addProduct = async (product: Product) => {
  // Upload image to Cloudinary
  const cloudinaryUrl = await uploadImageToCloudinary(product.imageUrl);

  if (cloudinaryUrl) {
    product.imageUrl = cloudinaryUrl;
  }

  const products = getProducts();
  products.push(product);
  saveProducts(products);
  console.log(products);
};

export const updateProduct = async (updatedProduct: Product) => {
  // Upload image to Cloudinary if the URL is not already a Cloudinary URL
  if (!updatedProduct.imageUrl.includes('cloudinary.com')) {
    const cloudinaryUrl = await uploadImageToCloudinary(updatedProduct.imageUrl);

    if (cloudinaryUrl) {
      updatedProduct.imageUrl = cloudinaryUrl;
    }
  }

  const products = getProducts().map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
  saveProducts(products);
};

export const deleteProduct = (id: string) => {
  const products = getProducts().filter((product) => product.id !== id);
  saveProducts(products);
};
