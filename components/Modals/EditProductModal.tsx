import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Product } from '@/lib/types/products';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import CustomButton from '../CustomButton';
import { productSchema } from '@/lib/formSchema';

type EditProductModalProps = {
  title?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product;
  onSave: (updatedProduct: Product) => void;
};



const EditProductModal: React.FC<EditProductModalProps> = ({ open, setOpen, product, onSave }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    },
  });
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (open) {
      reset({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
      });
    }
  }, [open, product, reset]);

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    const updatedProduct = {
      ...product,
      ...data,
    };
    try {
        setIsLoading(true);
        await onSave(updatedProduct)
    } catch (error) {
        console.error('Error updating product:', error);
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-xl font-semibold">Edit Product</h2>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Label htmlFor="name" className="block text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              className="mt-1 block w-full border-gray-300"
              {...register('name')}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mt-4">
            <Label htmlFor="description" className="block text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              className="mt-1 block w-full border-gray-300"
              {...register('description')}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div className="mt-4">
            <Label htmlFor="price" className="block text-sm font-medium">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              className="mt-1 block w-full border-gray-300"
              {...register('price', { valueAsNumber: true })}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div className="mt-4">
            <Label htmlFor="imageUrl" className="block text-sm font-medium">
              Image URL
            </Label>
            <Input
              id="imageUrl"
              type="text"
              className="mt-1 block w-full border-gray-300"
              {...register('imageUrl')}
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button type="button" onClick={() => setOpen(false)} className="mr-4 px-4 py-2 bg-gray-500 hover:bg-gray-400 text-white rounded-md">
              Cancel
            </Button>
            <CustomButton type="submit" isLoading={isLoading} disabled={isLoading} className="px-4 py-2 bg-black hover:bg-black/55 text-white rounded-md">
              Save
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
