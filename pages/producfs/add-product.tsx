import { useRouter } from 'next/router';
import { addProduct } from '@/utils/localStorage';
import ProductForm from '@/components/Forms/ProductForm';
import { Product } from '@/lib/types/products';
import { v4 as uuidv4 } from 'uuid';

const AddProductPage = () => {
  const router = useRouter();

  const handleAddProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct = {
      ...product,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addProduct(newProduct);
    router.push('/');
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Add Product</h1>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

export default AddProductPage;
