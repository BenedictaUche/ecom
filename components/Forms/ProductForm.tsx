import { useState } from 'react';
import { Product } from '@/lib/types/products';

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialValues?: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
}

const ProductForm = ({ onSubmit, initialValues }: ProductFormProps) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [price, setPrice] = useState(initialValues?.price || 0);
  const [category, setCategory] = useState(initialValues?.category || '');
  const [imageUrl, setImageUrl] = useState(initialValues?.imageUrl || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, price, category, imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Save Product
      </button>
    </form>
  );
};

export default ProductForm;
