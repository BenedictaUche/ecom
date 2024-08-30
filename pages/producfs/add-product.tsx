import { useRouter } from 'next/router';
import { addToCart } from '@/lib/cart';
import ProductForm from '@/components/Forms/ProductForm';
import { Product } from '@/lib/types/products';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Footer';

const AddProductPage = () => {
  const router = useRouter();

  const handleAddProduct = (product: Product) => {
    const newProduct = {
      ...product,
      id: uuidv4(),
    };


    const { id, name, price, imageUrl } = newProduct;
    addToCart(id, 1, name, price, imageUrl);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Add Product</h1>
        <ProductForm onSubmit={handleAddProduct} />
      </div>
      <Footer />
    </>
  );
};

export default AddProductPage;
