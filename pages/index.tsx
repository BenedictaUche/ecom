import { useEffect, useState } from 'react';
import { getProducts } from '../utils/localStorage';
import { Product } from '@/lib/types/products';
import Navbar from '@/components/Home/Navbar';
import Hero from '@/components/Home/Hero';

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  return (
    <div className="container mx-auto py-8">
      <Hero />
      <h1 className="text-3xl font-bold mb-8">Product Listing</h1>
    </div>
  );
};

export default HomePage;
