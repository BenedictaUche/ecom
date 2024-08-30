import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product } from '@/lib/types/products';

const addProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  image: z.string().optional(),
});

type ProductFormProps = {
  product: Product;
  onSubmit: (values: Product) => void;
};

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
    defaultValues: {
      name: product?.name || "",
      description: product?.description || "",
      price: product?.price || 0,
    },
  });

  const handleSubmit = (values: z.infer<typeof addProductSchema>) => {
    const product: Product = {
      id: "",
      quantity: 0,
      category: "",
      imageUrl: "",
      ...values,
    };
    onSubmit(product);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div>
        <label>Product Name</label>
        <input {...form.register('name')} placeholder="Product Name" />
      </div>
      <div>
        <label>Description</label>
        <input {...form.register('description')} placeholder="Description" />
      </div>
      <div>
        <label>Price</label>
        <input type="" {...form.register('price')} placeholder="Price" />
      </div>
      <div>
        <label>Image</label>
        <input type="file" {...form.register('image')} />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
